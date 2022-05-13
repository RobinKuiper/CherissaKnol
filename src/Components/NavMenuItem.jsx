import { Link, useLocation } from "react-router-dom";

export const NavMenuItem = ({ path, title }) => {
  const {pathname} = useLocation();

  return (
    <span className={`border-orange-300 ${pathname === path && 'border-b-2'} hover:border-b-2`}>
      <Link to={path} className="pb-1">
        {title}
      </Link>
    </span>
  )
}
