import { useEffect, useState } from 'react';
import { LightgalleryItem } from 'react-lightgallery';
import { useParams } from 'react-router-dom';
import { Loading } from '../Components';
import photos from '../data/photos';
import { helpers } from '../utils';
import { LightgalleryProvider } from 'react-lightgallery';
import 'lightgallery.js/dist/css/lightgallery.css';

export const Photo = () => {
  const { title } = useParams();
  const [photo, setPhoto] = useState(null);
  const [size, setSize] = useState(1);
  const [price, setPrice] = useState(size * 199.99);

  useEffect(() => {
    setPrice(size * 199.99);
  }, [size]);

  useEffect(() => {
    setPhoto(
      photos.default.find(
        (photo) => helpers.toSeoFriendly(photo.title) === title
      )
    );
  }, [title]);

  if (!photo) return <Loading />;

  return (
    <div>
      <LightgalleryProvider
        lightgallerySettings={{
          download: false,
          counter: false,
        }}
      >
        <div className="flex flex-row space-x-10">
          <div className="w-full h-full w-6/12">
            <LightgalleryItem
              src={`https://picsum.photos/1080/768?random=${title}`}
              alt={photo.title}
            >
              <img
                src={`https://picsum.photos/1080/768?random=${title}`}
                alt={photo.title}
                title={photo.title}
                className="border-4 border-[#F49E4B] cursor-pointer"
              />
            </LightgalleryItem>
          </div>

          <div className="relative">
            <h1 className="text-5xl text-shadow">{photo.title}</h1>
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

            <div className="absolute bottom-0 flex flex-row justify-end w-full">
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
                          size === 1 ? 'Small' : size === 2 ? 'Medium' : 'Big'
                        }
                      />
                    </td>
                  </tr>
                </table>
                <input type="hidden" name="currency_code" value="EUR" />
                <button className="button-76">Order</button>
              </form>
            </div>
          </div>
        </div>

        <div className="space-y-5 mt-10 z-10">
          <p>
            Ex cupidatat est ad aliquip adipisicing adipisicing proident quis
            velit. Ad nostrud qui amet ex. Id consequat nulla duis duis et sit
            officia enim in sit ipsum id. Duis consectetur et tempor magna
            incididunt anim. Cupidatat et ullamco exercitation esse ullamco
            cupidatat qui amet velit ut.
          </p>
          <p>
            Veniam amet dolore eu cupidatat occaecat fugiat incididunt cillum in
            voluptate consequat. Sit elit laboris culpa culpa. In et do culpa
            minim non consequat. Esse anim do esse laborum velit ipsum dolor.
          </p>
          <p className="z-10">
            Et eu nisi ex labore laboris sint officia eiusmod ut in dolore.
            Labore officia non occaecat velit in aute ipsum incididunt Lorem
            sint. Non dolor amet incididunt laborum. Magna aliqua officia
            voluptate aute ullamco ipsum amet cillum nisi. Lorem laboris sunt
            sunt et esse enim officia esse nulla do consequat qui. Excepteur qui
            cupidatat culpa exercitation occaecat eu nostrud qui nisi.
          </p>
        </div>
      </LightgalleryProvider>
    </div>
  );
};
