import { useEffect, useState } from 'react';
import Head from 'next/head';
import React from 'react';
import { CustomLink, Layout, Title } from '../../../components';
import 'lightgallery.js/dist/css/lightgallery.css';
import { LightgalleryItem, LightgalleryProvider } from 'react-lightgallery';
import { Loading } from '../../../components';
import Image from 'next/image';
import prisma from '../../../lib/prisma';
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from '@paypal/react-paypal-js';

const Photo = ({ photo }) => {
  const { title } = photo;
  const [size, setSize] = useState(1);
  const [price, setPrice] = useState(size * photo.price);

  useEffect(() => {
    setPrice(size * photo.price);
  }, [photo.price, size]);

  const createPayPalOrder = async () => {
    const response = await fetch('/api/paypal/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        photoId: photo.id,
        size,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.orderId;
    } else {
      console.log('Error: ', response.statusText);
    }
  };

  const onApprove = async (data) => {
    const response = await fetch('/api/paypal/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId: data.orderID }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('data: ', data);
      return data;
    } else {
      console.log('response: ', response);
      console.log('Error: ', response.statusText);
    }
  };

  return (
    <Layout>
      <Head>
        <title>{title} - Cherissa Knol</title>
      </Head>

      <LightgalleryProvider
        lightgallerySettings={{
          download: false,
          counter: false,
        }}
      >
        <div className="sm:flex flex-row sm:space-x-10">
          <div className="h-full mb-6 sm:mb-0 sm:w-6/12">
            {photo ? (
              <LightgalleryItem
                src={`https://picsum.photos/1080/768?random=${title}`}
                alt={photo.title}
              >
                <div className="border-4 border-orange-400 cursor-pointer">
                  <Image
                    src={`https://picsum.photos/1080/768?random=${title}`}
                    alt={photo.title}
                    title={photo.title}
                    layout="responsive"
                    width="1080px"
                    height="768px"
                  />
                </div>
              </LightgalleryItem>
            ) : (
              <Loading />
            )}
          </div>

          <div className="relative w-6/12">
            {photo ? (
              <>
                <Title>{photo.title}</Title>
                <CustomLink href={`/photos/${photo.category.slug}`}>
                  {photo.category.name}
                </CustomLink>
                <div className="mt-10 text-xl flex flex-row space-x-10 items-center">
                  <p className="">Size</p>
                  <select
                    className="p-2 text-black shadow-lg w-full"
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value={1}>Small</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Large</option>
                  </select>
                </div>
                <div className="mt-10 text-right">
                  <p className="text-2xl">$ {price}</p>
                </div>

                <div className="sm:absolute bottom-0  w-full">
                  {' '}
                  {/* flex flex-row justify-start */}
                  <PayPalScriptProvider
                    options={{
                      'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                      currency: 'EUR',
                    }}
                  >
                    <PayPalButtons
                      style={{
                        color: 'gold',
                        shape: 'rect',
                        label: 'buynow',
                        height: 50,
                      }}
                      fundingSource={FUNDING.PAYPAL}
                      createOrder={createPayPalOrder}
                      onApprove={onApprove}
                    />
                  </PayPalScriptProvider>
                  {/* <button className="button-76">Purchase</button> */}
                </div>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>

        <div className="space-y-5 mt-10">
          <p>{photo.description}</p>
        </div>
      </LightgalleryProvider>
    </Layout>
  );
};

export async function getStaticPaths() {
  const photos = await prisma.photo.findMany({
    include: {
      category: true,
    },
  });

  const paths = photos.map((photo) => ({
    params: {
      category: photo.category.slug,
      slug: photo.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const photo = await prisma.photo.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      category: true,
    },
  });

  return {
    props: {
      photo,
    },
  };
}

export default Photo;

// import { useRouter } from 'next/router'
//
// const Post = () => {
// const router = useRouter()
// const { pid } = router.query
//
// return <p>Post: {pid}</p>
// }
//
// export default Post
