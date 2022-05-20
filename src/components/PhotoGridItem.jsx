import Image from 'next/image';
import { CustomLink } from './CustomLink';

export const PhotoGridItem = ({ id, url, title, category, slug }) => {
  const src = url; //`https://picsum.photos/1080/768?random=${id}`;

  return (
    <CustomLink href={`/photos/${category.slug}/${slug}`}>
      <Image src={src} alt={title} title={title} layout="fill" />
    </CustomLink>
  );
};
