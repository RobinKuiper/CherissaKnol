import paypal from '@paypal/checkout-server-sdk'
import prisma from '../../../lib/prisma'
import client from '../../../lib/paypal'
import { promises as fs } from 'fs'

export default async function handle(
  req,
  res,
) {
  const { photoId, size } = req.body
  // Get photo from database
  const photo = await prisma.photo.findUnique({
    where: {
      id: photoId,
    },
  })

  if (!photo) {
    return res.status(404).json({
      error: 'Photo not found',
    })
  }

  const PaypalClient = client()
  //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
  const request = new paypal.orders.OrdersCreateRequest()
  request.headers['prefer'] = 'return=representation'
  request.requestBody({
    intent: 'CAPTURE',
    application_context: {
      brand_name: 'CKnol - Photography',
      locale: 'en-US',
      landing_page: 'BILLING',
    },
    purchase_units: [
      {
        reference_id: photo.id,
        description: photo.title,
        // custom_id: 'PUHF-Photos',
        // soft_descriptor: 'Photos',
        amount: {
          currency_code: 'EUR',
          value: photo.price,

          // This is the total amount for all the items in this purchase unit
          // including shipping, handling, and tax.
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: photo.price,
            },

            // This is the shipping amount for this purchase unit.
            shipping: {
              currency_code: 'EUR',
              value: '0.00',
            },
          },
        },
        items: [
          {
            name: photo.title,
            description: photo.title,
            unit_amount: {
              currency_code: 'EUR',
              value: photo.price,
            },
            quantity: '1',
            category: 'PHYSICAL_GOODS',
            // This is the tax amount for this item.
            tax: {
              currency_code: 'EUR',
              value: '0.00',
            },

          },
        ],
      },
    ],
  })
  const response = await PaypalClient.execute(request)
  if (response.statusCode !== 201) {
    res.status(500)
  }

  // Write result to file
  const result = JSON.stringify(response.result)
  await fs.writeFile(`./src/pages/api/paypal/create-order.json`, result)

  //Once order is created store the data using Prisma
  await prisma.order.create({
    data: {
      orderId: response.result.id,
      status: response.result.status,
      orderDetails: {
        create: {
          photoId: 1,
          quantity: 1,
          size: '4x6',
          price: 100,
        },
      },
      // createdAt: new Date().toISOString(),
    },
  })
  const resData = { orderId: response.result.id }
  res.status(200).json(resData)
}