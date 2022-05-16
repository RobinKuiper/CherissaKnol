import Head from 'next/head';
import { useMutation } from 'react-query';
import { Layout } from '../components';
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from '@paypal/react-paypal-js';

const Paypal_test = () => {
  const createMutation = useMutation(() =>
    fetch('/api/paypal/createOrder', {
      method: 'POST',
    })
  );

  const captureMutation = useMutation((data) =>
    fetch('/api/paypal/captureOrder', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  );

  const createPayPalOrder = async () => {
    const response = await createMutation.mutateAsync({});
    console.log('response', response);
    return response.data.orderId;
  };

  const onApprove = async (data) => {
    return captureMutation.mutate({ orderId: data.orderId });
  };

  return (
    <Layout>
      <Head>
        <title>Paypal Test</title>
      </Head>

      <main className="container">
        {captureMutation.data && (
          <div>{JSON.stringify(captureMutation.data)}</div>
        )}
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
