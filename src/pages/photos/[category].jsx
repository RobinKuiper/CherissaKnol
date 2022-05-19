import { useRef, useEffect, createRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.css';
import { Layout } from '../../components';
import prisma from '../../lib/prisma';
import { PhotoGridItem } from '../../components';
import { motion } from 'framer-motion';

// const PhotoGridItem = ({ id }) => (
//   <div className="h-full w-full">
//     <Image
//       src={`https://picsum.photos/1080/768?random=${id}`}
//       alt="test"
//       layout="fill"
//     />
//   </div>
// );

const Photos = ({ photos, category, nodes }) => {
  const refs = useRef({});
  const gridRef = useRef();

  if (Object.keys(refs.current).length !== photos.length) {
    photos.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  photos = photos.map((photo) => ({
    ...photo,
    ...nodes.find((node) => Number(node.id) === Number(photo.id)),
  }));

  useEffect(() => {
    gridRef.current =
      gridRef.current ||
      GridStack.init(
        {
          float: false,
          // cellHeight: '100px',
          minRow: 1,
          animate: true,
          resizable: { handles: 'se' },
          staticGrid: true,
        },
        '.grid-stack'
      );
    const grid = gridRef.current;
    grid.batchUpdate();
    grid.removeAll(false);
    photos.forEach(({ id }) => grid.makeWidget(refs.current[id].current));
    grid.commit();
  }, [photos]);

  return (
    <Layout>
      <Head>
        <title>{category.name} - Cherissa Knol</title>
      </Head>

      <div className={`grid-stack`}>
        {photos.map((photo) => {
          const random = Math.floor(Math.random() * 2) + 1;
          const minus = Math.floor(Math.random() * 2) === 0 ? '-' : '';
          const degrees = Number(`${minus}${random}`);

          const scale = photo.w > 2 || photo.h > 2 ? 1.1 : 1.3;

          return (
            <div
              id={photo.id}
              ref={refs.current[photo.id]}
              key={photo.id}
              className={''}
              gs-x={photo.x}
              gs-y={photo.y}
              gs-w={photo.w}
              gs-h={photo.h}
            >
              <motion.div
                whileHover={{
                  scale: scale,
                  rotate: degrees,
                }}
                transition={{
                  duration: 0,
                }}
                className="grid-stack-item-content object-cover shadow-sm shadow-black rounded ease-in-out duration-300 hover:shadow-2xl hover:shadow-gray-900 z-20 hover:z-50"
              >
                <PhotoGridItem {...photo} category={category} />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* <Suspense fallback={<Loading />}>
        <div className="grid-wrapper">
          {photos.map((photo, index) => (
            <PhotoGridItem key={index} {...photo} />
          ))}
        </div>
      </Suspense> */}
    </Layout>
  );
};

// export async function getStaticPaths() {
//   const categories = await prisma.category.findMany();

//   const paths = categories.map((category) => ({
//     params: {
//       category: category.slug,
//     },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
  const category = await prisma.category.findUnique({
    where: {
      slug: params.category,
    },
    include: {
      grid: true,
      photos: true,
    },
  });

  return {
    props: {
      photos: category.photos,
      nodes: category.grid ? JSON.parse(category.grid.nodes) : [],
      category,
    },
  };
}

export default Photos;
