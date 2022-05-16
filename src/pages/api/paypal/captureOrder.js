import paypal from '@paypal/checkout-server-sdk'
import prisma from '../../../lib/prisma'
import client from '../../../lib/paypal'

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

  // Update payment to PAID status once completed
  await prisma.payment.updateMany({
    where: {
      orderId,
    },
    data: {
      status: 'PAID',
    },
  })
  return res.json({ ...response.result })
}

// pages/api/paypal/captureOrder.js