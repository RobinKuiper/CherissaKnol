import { Link } from 'react-router-dom';
import { helpers } from '../utils';
import { SuspenseImg } from './SuspenseImg';

export const PhotoGridItem = ({ size, id, title, category }) => {
  let url = `https://picsum.photos/id/${id}/1080/768`;
  url = `https://picsum.photos/1080/768?random=${id}`;

  // random between 0 and 2
  const random = Math.floor(Math.random() * 3);

  // random 1 or 2 
  const random2 = Math.floor(Math.random() * 2) + 1;

  // random 2 or 3 
  const random3 = Math.floor(Math.random() * 3) + 2;

  const twothree = [2, 3]
  const twothreeRandom = twothree[Math.floor(Math.random() * twothree.length)];

  // console.log('random', random);

  const plusmin = ['', '-'];
  // get random array element
  const plusminRandom = plusmin[Math.floor(Math.random() * plusmin.length)];

  // console.log('plusminRandom', plusminRandom);

  const rotate = `${plusminRandom}rotate-2`;

  // console.log(rotate)


  return (
    // <div className={size + ' shadow-sm shadow-black cursor-pointer'}>
    <Link
      className={
        size +
        ` shadow-sm shadow-black cursor-pointer rounded ease-in-out duration-300 hover:shadow-2xl hover:shadow-gray-800 hover:scale-110 hover:${rotate}  hover:z-50`
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
    // </div>
  );
};
