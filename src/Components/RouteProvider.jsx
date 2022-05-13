import { Route, Routes } from 'react-router-dom';
import {
  Home,
  About,
  Collabs,
  Contact,
  Photos,
  Photo,
  NotFound,
} from '../Pages';

export const RouteProvider = ({ layout }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/collabs" element={<Collabs />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/photos/:category" element={<Photos layout={layout} />} />
      <Route path="/photos/:category/:title" element={<Photo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
