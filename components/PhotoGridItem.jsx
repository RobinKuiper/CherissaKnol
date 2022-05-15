import Image from 'next/image';
import { useState } from 'react';
import { urlHelpers } from '../helpers';
import { CustomLink } from './CustomLink';

export const PhotoGridItem = ({ size, id, title, category }) => {
  const [transform, setTransform] = useState('0deg scale(1)');

  // let url =
  //   'https://trekbible.com/wp-content/uploads/2017/09/mountains-1712079_1280.jpg';
  let url = `https://picsum.photos/id/${id}/1080/768`;
  url = `https://picsum.photos/1080/768?random=${id}`;

  const changeTransform = () => {
    // random random 1 or 2
    const random = Math.floor(Math.random() * 2) + 1;
    // random minus or nothing
    const minus = Math.floor(Math.random() * 2) === 0 ? '-' : '';

    const degrees = `${minus}${random}deg`;
    const multiplier = size === '' ? 1.3 : 1.1;

    setTransform(`rotate(${degrees}) scale(${multiplier})`);
  };

  const resetTransform = () => {
    setTransform('rotate(0deg) scale(1)');
  };

  return (
    <span
      className={
        size +
        ` relative object-cover shadow-sm shadow-black cursor-pointer rounded ease-in-out duration-300 hover:shadow-2xl hover:shadow-gray-900 z-20 hover:z-50`
      }
      style={{
        transform,
      }}
    >
      <CustomLink
        href={`/photos/${category}/${urlHelpers.toSeoFriendly(title)}`}
      >
        <Image
          src={url}
          alt={title}
          title={title}
          onMouseEnter={changeTransform}
          onMouseLeave={resetTransform}
          onMouseOut={() => resetTransform}
          layout="fill"
          style={{
            borderRadius: '5px',
          }}
        />
      </CustomLink>
    </span>
  );
};
