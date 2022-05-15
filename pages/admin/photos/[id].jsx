import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../../../components';
import { PhotoForm } from '../../../components/admin/PhotoForm';
import { photoRepo } from '../../../helpers';

const Photo = ({ photo }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, category, url, description, price, cols, rows } = e.target;

    try {
      fetch('/api/photos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.value,
          category: category.value,
          url: url.value,
          description: description.value,
          price: price.value,
          cols: cols.value,
          rows: rows.value,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Edit Photo - Cherissa Knol</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Edit Photo</h1>
        <p className="text-center">
          <Link href="/admin/photos">Back to Photos</Link>
        </p>
        <PhotoForm onSubmit={handleSubmit} photo={photo} />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: photoRepo.getPhotos().map((photo) => {
      return {
        params: {
          id: photo.id,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const photo = photoRepo.getPhoto(params.id);

  return {
    props: {
      photo,
    },
  };
}

export default Photo;
