import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { AdminLayout } from '../../../components/admin';
import { CategoryForm } from '../../../components/admin';
import prisma from '../../../lib/prisma';

const Category = ({ category }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name } = e.target;

    const response = await fetch(`/api/categories`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id.value,
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
    <AdminLayout>
      <Head>
        <title>Edit Category - Cherissa Knol</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Edit Category</h1>
        <p className="text-center">
          <Link href="/admin/categories">Back to Categories</Link>
        </p>
        <CategoryForm onSubmit={handleSubmit} category={category} />
      </div>
    </AdminLayout>
  );
};

export async function getStaticPaths() {
  const categories = await prisma.category.findMany();
  const paths = categories.map((category) => ({
    params: { id: category.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const category = await prisma.category.findUnique({
    where: { id: Number(params.id) },
  });

  return { props: { category } };
}

export default Category;
