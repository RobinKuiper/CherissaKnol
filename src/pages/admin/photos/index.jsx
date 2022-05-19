import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { AdminLayout } from '../../../components/admin';
import prisma from '../../../lib/prisma';
import Router from 'next/router';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

export default function Categories({ categories }) {
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
      Router.push('/admin/photos');
    } else {
      console.log('Error: ', response.statusText);
    }
  };

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
      Router.push('/admin/photos');
    } else {
      console.log('Error: ', response.statusText);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Admin - Cherissa Knol</title>
      </Head>

      <div>
        <div className="flex flex-row justify-between border-b border-white pb-1 pt-1">
          <div>
            <form onSubmit={handleSubmit} className="flex flex-row">
              <input
                type="text"
                placeholder="Category Name"
                className="px-3 text-black"
                name="name"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-orange-400 text-black"
              >
                <FaPlus />
              </button>
            </form>
          </div>

          <div>
            <span className="text-3xl">Categories</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4 mt-10">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-row space-x-4">
              <Link href={`/admin/photos/${category.slug}`}>
                <a className="text-2xl">{category.name}</a>
              </Link>
              <Link href={`/admin/photos/${category.slug}`}>
                <a className="py-2 px-4 rounded-full bg-orange-400 text-black">
                  <FaEdit />
                </a>
              </Link>
              <button
                className="py-2 px-4 rounded-full bg-orange-400 text-black"
                onClick={() => deleteCategory(category.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
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
