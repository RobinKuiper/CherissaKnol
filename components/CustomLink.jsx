import Link from 'next/link';

export const CustomLink = ({ children, href, ...attr }) => {
  const path = process.env.EXPORTED && href !== '/' ? `${href}.html` : href;

  return (
    <Link href={path} {...attr}>
      {children}
    </Link>
  );
};
