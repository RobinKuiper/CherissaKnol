import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { helpers } from '../utils';
import { SuspenseImg } from './SuspenseImg';

export const PhotoGridItem = ({ size, id, title, category }) => {
  const [transform, setTransform] = useState('0deg scale(1)');

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
    <Link
      className={
        size +
        ` shadow-sm shadow-black cursor-pointer rounded ease-in-out duration-300 hover:shadow-2xl hover:shadow-gray-900 hover:z-50`
      }
      style={{
        transform,
      }}
      onMouseEnter={changeTransform}
      onMouseLeave={resetTransform}
      onMouseOut={() => resetTransform}
      to={`/photos/${category}/${helpers.toSeoFriendly(title)}`}
    >
      <SuspenseImg
        src={url}
        alt={title}
        title={title}
        className="w-full h-full rounded object-cover"
      />
    </Link>
  );
};
