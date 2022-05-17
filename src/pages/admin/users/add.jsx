import { useSession, signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { Layout } from '../../../components';
import { UserForm } from '../../../components/admin';

const Add = ({}) => {
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = e.target;

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
    <Layout>
      <Head>
        <title>Add User - Cherissa Knol</title>
      </Head>

      {session ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center">Add User</h1>
          <p className="text-center">
            <Link href="/admin/users">Back to Users</Link>
          </p>
          <UserForm onSubmit={handleSubmit} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-center">Not Logged In</h1>
        </div>
      )}
    </Layout>
  );
};

export default Add;
