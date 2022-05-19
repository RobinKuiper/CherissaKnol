import Image from 'next/image';
import { CustomLink } from './CustomLink';

export const PhotoGridItem = ({ id, title, category, slug }) => {
  let url = `https://picsum.photos/id/${id}/1080/768`;
  url = `https://picsum.photos/1080/768?random=${id}`;

  return (
    <CustomLink href={`/photos/${category.slug}/${slug}`}>
      <Image src={url} alt={title} title={title} layout="fill" />
    </CustomLink>
  );
};
