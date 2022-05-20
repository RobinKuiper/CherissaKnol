import { useEffect, useState } from 'react';
import Head from 'next/head';
import React from 'react';
import Modal from 'react-modal';
import { CustomLink, Layout, Title } from '../../../components';
import { Loading } from '../../../components';
import Image from 'next/image';
import prisma from '../../../lib/prisma';
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from '@paypal/react-paypal-js';

const customStyles = {
  overlay: {
    zIndex: 50,
    background: 'rgba(0,0,0,0)',
  },
  content: {
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    background: 'rgba(0,0,0,0.7)',
  },
};

const Photo = ({ photo }) => {
  const { title } = photo;
  const [size, setSize] = useState(1);
  const [price, setPrice] = useState(size * photo.price);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

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

      <div className="sm:flex flex-row sm:space-x-10">
        <div className="h-full mb-6 sm:mb-0 sm:w-6/12">
          {photo ? (
            <div
              className="border-4 border-orange-400 cursor-pointer"
              onClick={toggleModal}
            >
              <Image
                src={photo.url}
                alt={photo.title}
                title={photo.title}
                layout="responsive"
                width="1080px"
                height="768px"
              />
            </div>
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
                {/* flex flex-row justify-start */}
                {photo.price > 0 && (
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
                )}
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

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Lightbox"
      >
        <button
          className="absolute top-0 right-0 pr-5 text-8xl text-white hover:text-[#b8b5b5]"
          onClick={toggleModal}
        >
          &times;
        </button>
        <div className="flex h-full justify-center items-center">
          <div className="w-[80%] h-[80%] relative">
            <Image
              src={photo.url}
              alt={photo.title}
              title={photo.title}
              layout="fill"
            />
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
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
