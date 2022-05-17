import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout, Title } from '../../components';


const Admin = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      {session ? (
        <div className="container">
          <Title>admin</Title>
          <p>
            <Link href="/admin/users">
              Users
            </Link>
          </p>
          <p>
            <Link href="/admin/categories">
              Categories
            </Link>
          </p>
          <p>
            <Link href="/admin/photos">
              Photos
            </Link>
          </p>
          <p>
            <button onClick={signOut}>Sign out</button>
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-center">Not Logged In</h1 >
          <button onClick={signIn}>Sign in</button>
        </div >
      )}
    </Layout>
  )
}

export default Admin;
