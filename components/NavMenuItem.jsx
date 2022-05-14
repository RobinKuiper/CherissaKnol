import Link from 'next/link';
import { useRouter } from 'next/router';

export const NavMenuItem = ({ path, title, toggleCollapse }) => {
  const { asPath } = useRouter();

  return (
    <span
      className={`mx-1 border-b-2 border-transparent ease-in-out duration-300 
       ${asPath === path ? 'border-orange-300' : ''} 
        hover:border-orange-300`}
      onClick={toggleCollapse}
    >
      <Link href={path} className="pb-1">
        {title}
      </Link>
    </span>
  );
};
