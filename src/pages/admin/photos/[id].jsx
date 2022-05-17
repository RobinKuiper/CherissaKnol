import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { Layout } from '../../../components';
import { PhotoForm } from '../../../components/admin/PhotoForm';
import prisma from '../../../lib/prisma';

const Photo = ({ photo, categories }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, title, categoryId, url, description, price, cols, rows } =
      e.target;

    const response = await fetch(`/api/photos`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id.value,
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
    <Layout>
      <Head>
        <title>Edit Photo - Cherissa Knol</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Edit Photo</h1>
        <p className="text-center">
          <Link href="/admin/photos">Back to Photos</Link>
        </p>
        <PhotoForm
          onSubmit={handleSubmit}
          photo={photo}
          categories={categories}
        />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const photos = await prisma.photo.findMany();
  const paths = photos.map((photo) => ({
    params: { id: photo.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const photo = await prisma.photo.findUnique({
    where: { id: Number(params.id) },
  });

  const categories = await prisma.category.findMany();

  return { props: { photo, categories } };
}

export default Photo;
