import { useSession, signIn } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '../../components';
import { photoRepo } from '../../helpers';

export default function Photos() {
  const { data: session } = useSession();

  const deletePhoto = async (photoId) => {
    try {
      await fetch('/api/photos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({
          id: photoId,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Admin - Cherissa Knol</title>
      </Head>

      {session ? (
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

            {photoRepo.getPhotos().map((photo) => (
              <tr key={photo.id}>
                <td className="p-1">{photo.id}</td>
                <td className="p-1 w-[10%] relative">
                  <Image
                    src={`https://picsum.photos/1080/768?random=${photo.id}`}
                    alt={photo.title}
                    layout="responsive"
                    width="100%"
                    height="100%"
                  />
                </td>
                <td className="font-bold">{photo.title}</td>
                <td>{photo.category}</td>
                <td>
                  <Link href={`/admin/photos/${photo.id}`}>Edit</Link> |{' '}
                  <button onClick={() => deletePhoto(photo.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-center">Not Logged In</h1>
        </div>
      )}
    </Layout>
  );
}
