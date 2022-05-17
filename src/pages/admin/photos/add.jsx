import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { AdminLayout } from '../../../components/admin';
import { PhotoForm } from '../../../components/admin/PhotoForm';
import prisma from '../../../lib/prisma';

const Add = ({ categories }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, categoryId, url, description, price, cols, rows } = e.target;

    const response = await fetch('/api/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title.value,
        categoryId: categoryId.value,
        url: url.value,
        description: description.value,
        price: price.value,
        cols: cols.value,
        rows: rows.value,
      }),
    });

    if (response.ok) {
      Router.push('/admin/photos');
    } else {
      console.log('Error: ', response.statusText);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Add Photo - Cherissa Knol</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Add Photo</h1>
        <p className="text-center">
          <Link href="/admin/photos">Back to Photos</Link>
        </p>
        <PhotoForm onSubmit={handleSubmit} categories={categories} />
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps = async () => {
  const categories = await prisma.category.findMany();

  return { props: { categories } };
};

export default Add;
