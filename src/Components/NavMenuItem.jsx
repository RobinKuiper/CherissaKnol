import { Link, useLocation } from 'react-router-dom';

export const NavMenuItem = ({ path, title, toggleCollapse }) => {
  const { pathname } = useLocation();

  return (
    <span
      className={`border-b-2 border-transparent ease-in-out duration-300 ${
        pathname === path && 'border-orange-300'
      } hover:border-orange-300`}
    >
      <Link to={path} className="pb-1" onClick={toggleCollapse}>
        {title}
      </Link>
    </span>
  );
};
