

import photos from '../data/photos.json';
import path from 'path';
import { promises as fs } from 'fs';

const adminPhotoRepo = {
  update: async (photo) => {
    const photoIndex = photos.findIndex((p) => p.id === photo.id);
    photos[photoIndex] = photo;

    await fs.writeFile(path.join(__dirname, '../../data/photos.json'), JSON.stringify(photos, null, 2));

    return photo;
  },
  add: async (photo) => {
    const newPhoto = {
      id: photos.length + 1,
      ...photo,
    };

    photos.push(newPhoto);

    await fs.writeFile(path.join(__dirname, '../data/photos.json'), JSON.stringify(photos, null, 2));

    return newPhoto;
  },
  delete: async (id) => {
    const photoIndex = photos.findIndex((p) => p.id === id);
    const deletedPhoto = photos.splice(photoIndex, 1);

    await fs.writeFile(path.join(__dirname, '../data/photos.json'), JSON.stringify(photos, null, 2));

    return deletedPhoto;
  }
}

export default adminPhotoRepo;