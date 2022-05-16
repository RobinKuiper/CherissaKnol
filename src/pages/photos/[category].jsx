import Head from 'next/head';
import { Suspense } from 'react';
import { Layout, Loading, PhotoGridItem } from '../../components';
import { photoRepo } from '../../helpers';
import prisma from '../../lib/prisma';

const Photos = ({ photos, category }) => {
  return (
    <Layout>
      <Head>
        <title>{category} - Cherissa Knol</title>
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
  const categories = await prisma.category.findMany();

  const paths = categories.map((category) => ({
    params: {
      category: category.slug,
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Get all photos from prisma and return props for each photo
  const photos = await prisma.photo.findMany({
    where: {
      category: {
        slug: params.category,
      },
    },
    include: {
      category: true,
    },
  });

  return {
    props: {
      photos,
      category: params.category,
    },
  };
}

export default Photos;
