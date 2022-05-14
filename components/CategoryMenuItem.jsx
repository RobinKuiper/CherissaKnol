import Link from 'next/link';
import { useRouter } from 'next/router';

export const CategoryMenuItem = ({ path, title, toggleCollapse }) => {
  const { query } = useRouter();

  return (
    <li
      className={`
      pl-5 p-2 ease-in-out duration-500 hover:pl-6
      ${
        query.category && query.category === title.toLowerCase()
          ? 'bg-orange-300'
          : ''
      } hover:bg-orange-300`}
      onClick={toggleCollapse}
    >
      <Link
        href={path}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        {title}
      </Link>
    </li>
  );
};
