import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, Title } from '../components';

const Custom404 = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;

    const mail = async () => {
      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: '404 Error on CherissaKnol',
          message: `404 Error on CherissaKnol: ${asPath}`,
        }),
      });

      if (response.ok) {
        console.log('Email sent');
      } else {
        console.log('Error: ', response.statusText);
      }
    };

    mail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Head>
        <title>Page Not Found - Cherissa Knol</title>
      </Head>

      <div className="flex flex-col items-center justify-center h-screen -mt-20">
        <Title className="text-5xl text-gray-300">404</Title>
        <Title className="text-3xl text-gray-300">There Is Nothing Here</Title>
      </div>
    </Layout>
  );
};

export default Custom404;
