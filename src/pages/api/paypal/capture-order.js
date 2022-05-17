import paypal from '@paypal/checkout-server-sdk'
import prisma from '../../../lib/prisma'
import client from '../../../lib/paypal'
import { promises as fs } from 'fs'

export default async function handle(
  req,
  res,
) {
  //Capture order to complete payment
  const { orderId } = req.body
  const PaypalClient = client()
  const request = new paypal.orders.OrdersCaptureRequest(orderId)
  request.requestBody({})
  const response = await PaypalClient.execute(request)
  if (!response) {
    return res.status(500)
  }

  const payer = response.result.payer;
  const unit = response.result.purchase_units[0];
  const { shipping } = unit;

  // Check if customer is already in database with email or payer id
  const customer = await prisma.customer.findFirst({
    where: {
      OR: [
        { email: payer.email_address },
        { payerId: payer.payer_id },
      ],
    },
  });

  // If customer is not in database, create new customer
  if (!customer) {
    await prisma.customer.create({
      data: {
        payerId: payer.payer_id,
        email: payer.email_address,
        name: payer.name.given_name,
        surName: payer.name.surname,
        address1: payer.address.address_line_1,
        address2: payer.address.address_line_2 || '',
        city: payer.address.admin_area_2,
        state: payer.address.admin_area_1,
        zip: payer.address.postal_code,
        country: payer.address.country_code,
        shippingName: shipping.name.full_name,
        shippingAddress1: shipping.address.address_line_1,
        shippingAddress2: shipping.address.address_line_2 || '',
        shippingCity: shipping.address.admin_area_2,
        shippingState: shipping.address.admin_area_1,
        shippingZip: shipping.address.postal_code,
        shippingCountry: shipping.address.country_code,
        orders: {
          connect: {
            orderId: orderId,
          }
        },
      },
    })
  } else {
    // If customer is in database, update customer
    await prisma.customer.update({
      where: {
        id: customer.id,
      },
      data: {
        orders: {
          connect: {
            orderId: orderId,
          }
        },
      },
    })
  }

  // Update payment to PAID status once completed
  await prisma.order.updateMany({
    where: {
      orderId,
    },
    data: {
      status: response.result.status === 'COMPLETED' ? 'PAID' : 'PENDING',
    },
  })

  // Save result to file

  const result = JSON.stringify(response.result)
  await fs.writeFile(`./src/pages/api/paypal/capture-order.json`, result)

  return res.json({ ...response.result })
}

// pages/api/paypal/captureOrder.js