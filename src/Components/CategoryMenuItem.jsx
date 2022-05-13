import { Link, useLocation } from "react-router-dom"

export const CategoryMenuItem = ({ path, title }) => {
  const {pathname} = useLocation();

  return (
    <li className={`p-1 ease-in-out duration-500 ${pathname === path && 'bg-orange-300'} hover:bg-orange-300`}>
      <Link to={path} className="pl-5 ease-in-out duration-300 hover:pl-6">
        {title}
      </Link>
    </li>
  )
}
