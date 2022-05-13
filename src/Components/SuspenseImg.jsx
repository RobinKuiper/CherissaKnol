import { imgCache } from '../utils/imgCache';

export const SuspenseImg = ({ src, ...rest }) => {
  imgCache.read(src);
  return <img src={src} {...rest} />;
};