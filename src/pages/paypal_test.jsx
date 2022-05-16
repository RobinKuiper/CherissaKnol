import Head from 'next/head';
import { Layout } from '../components';
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from '@paypal/react-paypal-js';

const Paypal_test = () => {
  const createPayPalOrder = async () => {
    const response = await fetch('/api/paypal/createOrder', {
      method: 'POST',
    });

    if (response.ok) {
      const data = await response.json();
      return data.orderId;
    } else {
      console.log('Error: ', response.statusText);
    }
  };

  const onApprove = async (data) => {
    const response = await fetch('/api/paypal/captureOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId: data.orderID }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('data: ', data);
      return data;
    } else {
      console.log('response: ', response);
      console.log('Error: ', response.statusText);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Paypal Test</title>
      </Head>

      <main className="container">
        <PayPalScriptProvider
          options={{
            'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            currency: 'PHP',
          }}
        >
          <PayPalButtons
            style={{
              color: 'gold',
              shape: 'rect',
              label: 'pay',
              height: 50,
            }}
            fundingSource={FUNDING.PAYPAL}
            createOrder={createPayPalOrder}
            onApprove={onApprove}
          />
        </PayPalScriptProvider>
      </main>
    </Layout>
  );
};

export default Paypal_test;
