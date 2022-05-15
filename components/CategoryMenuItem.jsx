import { useRouter } from 'next/router';
import { CustomLink } from './CustomLink';

export const CategoryMenuItem = ({ path, title, toggleCollapse }) => {
  const { query } = useRouter();

  return (
    <CustomLink href={path}>
      <li
        className={`
      pl-5 p-2 ease-in-out duration-500 hover:pl-6 cursor-pointer
      ${
        query.category && query.category === title.toLowerCase()
          ? 'bg-orange-300'
          : ''
      } hover:bg-orange-300`}
        onClick={toggleCollapse}
      >
        {title}
      </li>
    </CustomLink>
  );
};
