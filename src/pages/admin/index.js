import Head from 'next/head';
import Link from 'next/link';
import { Title } from '../../components';
import { AdminLayout } from '../../components/admin';
import prisma from '../../lib/prisma';

const Admin = ({
  customers,
  users,
  categories,
  photos,
  orders
}) => {

  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <div className="container pt-5">
        <Title>admin</Title>
        <div className='flex flex-row flex-wrap space-x-10 justify-center'>
          <div className='border-2 w-1/4 p-2 bg-white text-black shadow-2xl'>
            <h3 className='text-2xl mb-2'>Overview</h3>
            <table className='w-full'>
              <tbody>
                <tr>
                  <td>Users</td>
                  <td>{users.length}</td>
                </tr>
                <tr>
                  <td>Categories</td>
                  <td>{categories.length}</td>
                </tr>
                <tr>
                  <td>Photos</td>
                  <td>{photos.length}</td>
                </tr>
                <tr>
                  <td>Customers</td>
                  <td>{customers.length}</td>
                </tr>
                <tr>
                  <td>Orders</td>
                  <td>{orders.length}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='border-2 w-1/4 p-2 bg-white text-black shadow-2xl'>
            <h3 className='text-2xl mb-2'>Latest Orders</h3>
            <table className='w-full'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer.name}</td>
                    <td>{order.total}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export async function getServerSideProps() {
  const users = await prisma.user.findMany();
  const categories = await prisma.category.findMany({
    include: {
      photos: true
    }
  });
  const photos = await prisma.photo.findMany({
    include: {
      category: true
    }
  });

  // Get all photos from prisma and return props for each photo
  const customers = await prisma.customer.findMany({
    include: {
      orders: true,
    },
  });

  const customersWithModifedDates = customers.map((customer) => {
    // Convert date to iso string
    customer.createdAt = customer.createdAt.toISOString();
    customer.orders = customer.orders.map((order) => {
      order.createdAt = order.createdAt.toISOString();
      order.updatedAt = order.updatedAt.toISOString();
      return order;
    });

    return customer;
  });

  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      orderDetails: true
    }
  });

  return {
    props: {
      customers: customersWithModifedDates,
      users,
      categories,
      photos,
      orders
    },
  };
}

export default Admin;
