import { useRouter } from 'next/router';
import { CustomLink } from './CustomLink';

export const CategoryMenuItem = ({ path, title, toggleCollapse, icon }) => {
  const { query } = useRouter();

  return (
    <CustomLink href={path}>
      <li
        className={`
      pl-5 p-2 ease-in-out duration-500 hover:pl-6
      ${
        query.category && query.category === title.toLowerCase()
          ? 'bg-[#D4AF37]'
          : ''
      } hover:bg-[#D4AF37]`}
        onClick={toggleCollapse}
      >
        <div className="flex items-center space-x-4">
          {icon}
          <span>{title}</span>
        </div>
      </li>
    </CustomLink>
  );
};
