import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { AdminLayout } from '../../../components/admin';
import { UserForm } from '../../../components/admin';
import prisma from '../../../lib/prisma';

const User = ({ user }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, username, email, password } = e.target;

    const response = await fetch(`/api/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id.value,
        username: username.value,
        email: email.value,
        password: password.value,
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
        <title>Edit User - Cherissa Knol</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Edit User</h1>
        <p className="text-center">
          <Link href="/admin/users">Back to Users</Link>
        </p>
        <UserForm onSubmit={handleSubmit} user={user} />
      </div>
    </AdminLayout>
  );
};

// export async function getStaticPaths() {
//   const users = await prisma.user.findMany();
//   const paths = users.map((user) => ({
//     params: { id: user.id.toString() },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  return { props: { user: user } };
}

export default User;
