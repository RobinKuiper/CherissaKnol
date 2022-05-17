import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { AdminLayout } from '../../../components/admin';
import prisma from '../../../lib/prisma';
import Router from 'next/router';

export default function Categories({ categories }) {
  const deleteCategory = async (categoryId) => {
    const response = await fetch(`/api/categories/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: categoryId,
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
        <title>Admin - Cherissa Knol</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Categories</h1>
        <p className="text-center">
          <Link href="/admin/categories/add">Add a category</Link>
        </p>
        <table className="w-full">
          <tr className="text-left">
            <th>ID</th>
            <th>Name</th>
            <th>Photo Count</th>
            <th>Actions</th>
          </tr>

          {categories.map((category) => (
            <tr key={category.id}>
              <td className="p-1">{category.id}</td>
              <td className="font-bold">{category.name}</td>
              <td>{(category.photos && category.photos.length) || 0}</td>
              <td>
                <Link href={`/admin/categories/${category.id}`}>Edit</Link> |{' '}
                <button onClick={() => deleteCategory(category.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ params }) {
  // Get all categories from prisma and return props for each photo
  const categories = await prisma.category.findMany();

  return {
    props: {
      categories,
    },
  };
}
