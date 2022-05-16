import { useEffect, useState } from 'react';
import Head from 'next/head';
import React from 'react';
import { Layout, Title } from '../../../components';
import { photoRepo, urlHelpers } from '../../../helpers';
import 'lightgallery.js/dist/css/lightgallery.css';
import { LightgalleryItem, LightgalleryProvider } from 'react-lightgallery';
import { Loading } from '../../../components';
import Image from 'next/image';

const Photo = ({ photo }) => {
  const { title } = photo;
  const [size, setSize] = useState(1);
  const [price, setPrice] = useState(size * photo.price);

  useEffect(() => {
    setPrice(size * photo.price);
  }, [size]);

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
                <p>{photo.category}</p>
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

                <div className="sm:absolute bottom-0 flex flex-row justify-start w-full">
                  <form
                    action="https://www.paypal.com/cgi-bin/webscr"
                    method="post"
                    target="_top"
                  >
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input
                      type="hidden"
                      name="hosted_button_id"
                      value="JBCRBRUHHLLPS"
                    />
                    <table>
                      <tr>
                        <td>
                          <input type="hidden" name="on0" value="Size" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input
                            type="hidden"
                            name="os0"
                            value={
                              size === 1
                                ? 'Small'
                                : size === 2
                                ? 'Medium'
                                : 'Big'
                            }
                          />
                        </td>
                      </tr>
                    </table>
                    <input type="hidden" name="currency_code" value="EUR" />
                    <button className="button-76">Purchase</button>
                  </form>
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
  return {
    paths: photoRepo.getPhotos().map((photo) => {
      return {
        params: {
          category: photo.category,
          slug: urlHelpers.toSeoFriendly(photo.title),
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const photo = photoRepo.getPhotoBySlug(params.slug);

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
