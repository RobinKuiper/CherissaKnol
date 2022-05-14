import photos from '../data/photos.json';
import urlHelpers from './url';

const photoRepo = {
  getPhotos: () => photos,
  getPhotoByTitle: (title) => photos.find((photo) => photo.title === title),
  getPhotoBySlug: (slug) => photos.find((photo) => urlHelpers.toSeoFriendly(photo.title) === slug),
  getPhotosByCategory: (category) => photos.filter((photo) => photo.category === category),
  getPhotosByTags: (tags) => photos.filter((photo) => photo.tags.includes(tags)),
  find: (query) => photos.find(query)
}

export default photoRepo;