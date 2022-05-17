import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { AdminLayout } from '../../../components/admin';
import prisma from '../../../lib/prisma';
import Router from 'next/router';

export default function Index({ customers }) {
  const remove = async (id) => {
    const response = await fetch(`/api/customers/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (response.ok) {
      Router.push('/admin/customers');
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
        <h1 className="text-3xl font-bold text-center">Customers</h1>

        <table className="w-full">
          <tr className="text-left">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Orders</th>
            <th>Actions</th>
          </tr>

          {customers &&
            customers.map((customer) => (
              <tr key={customer.id}>
                <td className="p-1">{customer.id}</td>
                <td className="font-bold">
                  {customer.surName}, {customer.name}
                </td>
                <td>{customer.email}</td>
                <td className="flex flex-row space-x-2">
                  {customer.orders.map((order) => (
                    <Link href={`/admin/orders/${order.id}`} key={order.id}>
                      <a>[{order.orderId}]</a>
                    </Link>
                  ))}
                </td>
                <td>
                  {/* <Link href={`/admin/customers/${customer.id}`}>Edit</Link> |{' '} */}
                  <button onClick={() => remove(customer.id)}>Delete</button>
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

  return {
    props: {
      customers: customersWithModifedDates,
    },
  };
}
