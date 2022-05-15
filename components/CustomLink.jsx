import Link from 'next/link';

export const CustomLink = (props) => {
  const { children, href, ...attr } = props;

  const path = process.env.EXPORTED && href !== '/' ? `${href}.html` : href;

  return (
    <Link href={path} {...attr}>
      {children}
    </Link>
  );
};
