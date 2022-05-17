import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { AdminLayout } from '../../../components/admin';
import prisma from '../../../lib/prisma';
import Router from 'next/router';

export default function Users({ users }) {
  const deletePhoto = async (id) => {
    const response = await fetch(`/api/users/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (response.ok) {
      Router.push('/admin/users');
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
        <h1 className="text-3xl font-bold text-center">Users</h1>
        <p className="text-center">
          <Link href="/admin/users/add">Add a user</Link>
        </p>
        <table className="w-full">
          <tr className="text-left">
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>

          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td className="p-1">{user.id}</td>
                <td className="font-bold">{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link href={`/admin/users/${user.id}`}>Edit</Link> |{' '}
                  <button onClick={() => deletePhoto(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ params }) {
  // Get all photos from prisma and return props for each photo
  const users = await prisma.user.findMany({});

  return {
    props: {
      users: users,
    },
  };
}
