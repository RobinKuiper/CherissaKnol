import Link from 'next/link';

export const CustomLink = (props) => {
  const { children, href, ...attr } = props;

  console.log('NODE ENV:', process.env.NODE_ENV);

  // const path =
  //   process.env.NODE_ENV !== 'development'
  //     ? href === '/'
  //       ? '/'
  //       : `${href}.html`
  //     : href;

  const path = href;

  return (
    <Link href={path} {...attr}>
      {children}
    </Link>
  );
};
