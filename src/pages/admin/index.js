import { signOut } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { Title } from '../../components';
import { AdminLayout } from '../../components/admin';


const Admin = () => {

  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

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
    </AdminLayout>
  )
}

export default Admin;
