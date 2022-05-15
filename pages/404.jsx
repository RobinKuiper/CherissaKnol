import Head from 'next/head';
import { Layout, Title } from '../components';

const Custom404 = () => {
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
