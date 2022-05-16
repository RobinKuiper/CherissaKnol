import paypal from '@paypal/checkout-server-sdk'

const configureEnvironment = function () {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  console.log('Environment: ', process.env.NODE_ENV)

  return process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret)
}

const client = function () {
  return new paypal.core.PayPalHttpClient(configureEnvironment())
}

export default client