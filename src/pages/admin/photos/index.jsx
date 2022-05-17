import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { AdminLayout } from '../../../components/admin';
import prisma from '../../../lib/prisma';
import Router from 'next/router';

export default function Photos({ photos }) {
  const deletePhoto = async (photoId) => {
    const response = await fetch(`/api/photos/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: photoId,
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

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Photos</h1>
        <p className="text-center">
          <Link href="/admin/photos/add">Add a photo</Link>
        </p>
        <table className="w-full">
          <tr className="text-left">
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>

          {photos.map((photo) => (
            <tr key={photo.id}>
              <td className="p-1">{photo.id}</td>
              <td className="p-1 w-[10%] relative">
                {console.log('photo', photo.photo)}
                <Image
                  src={`https://picsum.photos/1080/768?random=${photo.id}`}
                  alt={photo.title}
                  layout="responsive"
                  width="100%"
                  height="100%"
                />
              </td>
              <td className="font-bold">{photo.title}</td>
              <td>{photo.category.name}</td>
              <td>
                <Link href={`/admin/photos/${photo.id}`}>Edit</Link> |{' '}
                <button onClick={() => deletePhoto(photo.id)}>Delete</button>
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
  const photos = await prisma.photo.findMany({
    include: {
      category: true,
    },
  });

  return {
    props: {
      photos,
    },
  };
}
