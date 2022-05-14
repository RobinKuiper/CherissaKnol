import Link from 'next/link';

export const CustomLink = (props) => {
  const { children, href } = props;

  const path =
    process.env.NODE_ENV !== 'development'
      ? href === href
        ? '/'
        : `${href}.html`
      : href;

  return (
    <Link href={path} {...props}>
      {children}
    </Link>
  );
};
