import { Link, useLocation } from 'react-router-dom';

export const CategoryMenuItem = ({ path, title, toggleCollapse }) => {
  const { pathname } = useLocation();

  return (
    <li
      className={`ease-in-out duration-500 ${
        pathname === path && 'bg-orange-300'
      } hover:bg-orange-300`}
    >
      <Link
        to={path}
        className="w-full h-full block pl-5 p-1.5 ease-in-out duration-300 hover:pl-6"
        onClick={toggleCollapse}
      >
        {title}
      </Link>
    </li>
  );
};
