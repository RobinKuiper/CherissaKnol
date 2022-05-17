import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { AdminLayout } from '../../../components/admin';
import prisma from '../../../lib/prisma';
import Router from 'next/router';

export default function Index({ orders }) {
  const remove = async (id) => {
    const response = await fetch(`/api/orders/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (response.ok) {
      Router.push('/admin/orders');
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
        <h1 className="text-3xl font-bold text-center">Orders</h1>

        <table className="w-full">
          <tr className="text-left">
            <th>ID</th>
            <th>Order ID</th>
            <th>Status</th>
            <th>Shipped</th>
            <th>Customer</th>
            <th>Actions</th>
          </tr>

          {orders &&
            orders.map((order) => (
              <tr key={order.id}>
                <td className="p-1">{order.id}</td>
                <td className="font-bold">{order.orderId}</td>
                <td>{order.status}</td>
                <td>{order.shipped && 'Yes'}</td>
                <td>
                  {order.customer && (
                    <Link href={`/admin/customers/${order.customer.id}`}>
                      <a>
                        {order.customer.surName}, {order.customer.name}
                      </a>
                    </Link>
                  )}
                </td>
                <td>
                  {/* <Link href={`/admin/orders/${customer.id}`}>Edit</Link> |{' '} */}
                  <button onClick={() => remove(order.id)}>Delete</button>
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
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
    },
  });

  const ordersWithModifiedDates = orders.map((order) => {
    // Convert date to iso string
    order.createdAt = order.createdAt.toISOString();
    order.updatedAt = order.updatedAt.toISOString();
    if (order.customer)
      order.customer.createdAt = order.customer.createdAt.toISOString();

    return order;
  });

  return {
    props: {
      orders: ordersWithModifiedDates,
    },
  };
}
