import { imgCache } from '../helpers';

export const SuspenseImg = ({ src, ...rest }) => {
  imgCache.read(src);
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={src} {...rest} />;
};
