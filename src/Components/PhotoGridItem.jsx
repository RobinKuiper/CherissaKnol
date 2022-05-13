import { Link } from 'react-router-dom';
import { helpers } from '../utils';
import { SuspenseImg } from './SuspenseImg';

export const PhotoGridItem = ({ size, id, title, category }) => {
  let url = `https://picsum.photos/id/${id}/1080/768`;
  url = `https://picsum.photos/1080/768?random=${id}`;

  return (
    // <div className={size + ' shadow-sm shadow-black cursor-pointer'}>
    <Link
      className={
        size +
        ' shadow-sm shadow-black cursor-pointer rounded ease-in-out duration-300 hover:scale-110 hover:-rotate-2 hover:translate-x-2 hover:translate-y-2'
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
