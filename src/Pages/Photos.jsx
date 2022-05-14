import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading, PhotoGridItem } from '../Components';
import photos from '../data/photos.json';

export const Photos = () => {
  const { category } = useParams();
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(() => {
    setFilteredPhotos(
      photos['full'].filter(
        (photo) => photo.category.toLowerCase() === category.toLowerCase()
      )
    );
  }, [category]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid-wrapper">
        {filteredPhotos.map((photo, index) => (
          <PhotoGridItem key={index} {...photo} />
        ))}
      </div>
    </Suspense>
  );
};
