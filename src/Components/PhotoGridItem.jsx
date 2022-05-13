import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { helpers } from '../utils';
import { SuspenseImg } from './SuspenseImg';

export const PhotoGridItem = ({ size, id, title, category }) => {
  const [rotate, setRotate] = useState()

  let url = `https://picsum.photos/id/${id}/1080/768`;
  url = `https://picsum.photos/1080/768?random=${id}`;

  useEffect(() => {
    // random between 0 and 2
    const random = Math.floor(Math.random() * 3);

    setRotate(random === 0 ? '-rotate-2' : 'rotate-2');
  }, [])

  return (
    <Link
      className={
        size +
        ` shadow-sm shadow-black cursor-pointer rounded ease-in-out duration-300 hover:shadow-2xl hover:shadow-gray-900 hover:scale-110 hover:${rotate} hover:z-50`
      }
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
