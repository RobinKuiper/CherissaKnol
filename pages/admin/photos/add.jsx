import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { Layout } from '../../../components';
import { PhotoForm } from '../../../components/admin/PhotoForm';

export const add = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, category, url, description, price, cols, rows } = e.target;

    try {
      fetch('/api/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.value,
          category: category.value,
          url: url.value,
          description: description.value,
          price: price.value,
          cols: cols.value,
          rows: rows.value,
        }),
      });
      Router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Add Photo - Cherissa Knol</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Add Photo</h1>
        <p className="text-center">
          <Link href="/admin/photos">Back to Photos</Link>
        </p>
        <PhotoForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default add;
