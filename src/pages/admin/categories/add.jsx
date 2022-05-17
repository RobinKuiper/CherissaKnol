import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { Layout } from '../../../components';
import { CategoryForm } from '../../../components/admin';

const Add = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = e.target;

    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
      }),
    });

    if (response.ok) {
      Router.push('/admin/categories');
    } else {
      console.log('Error: ', response.statusText);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Add Category - Cherissa Knol</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Add Category</h1>
        <p className="text-center">
          <Link href="/admin/categories">Back to Categories</Link>
        </p>
        <CategoryForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default Add;
