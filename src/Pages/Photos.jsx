import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading, PhotoGridItem } from '../Components';
import photos from '../data/photos.json';

export const Photos = ({ layout }) => {
  const { category } = useParams();
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(() => {
    const l = layout === 'default' ? layout : 'full';
    setFilteredPhotos(
      photos[l].filter(
        (photo) => photo.category.toLowerCase() === category.toLowerCase()
      )
    );
  }, [category, layout]);

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
