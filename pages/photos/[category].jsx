import Head from 'next/head';
import { Suspense } from 'react';
import { Layout, Loading, PhotoGridItem } from '../../components';
import { photoRepo } from '../../helpers';

const Photos = ({ photos }) => {
  return (
    <Layout>
      <Head>
        <title>Photos - Cherissa Knol</title>
      </Head>

      <Suspense fallback={<Loading />}>
        <div className="grid-wrapper">
          {photos.map((photo, index) => (
            <PhotoGridItem key={index} {...photo} />
          ))}
        </div>
      </Suspense>
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      ...new Set(photoRepo.getPhotos().map((photo) => photo.category)),
    ].map((category) => {
      return {
        params: {
          category,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const photos = photoRepo.getPhotosByCategory(params.category);

  return {
    props: {
      photos,
    },
  };
}

export default Photos;
