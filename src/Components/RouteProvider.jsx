import { Route, Routes } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collabs" element={<Collabs />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/photos/:category" element={<></>} />
        <Route path="/photos/:category/:title" element={<Photo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <TransitionGroup>
        <CSSTransition key={location.key} classNames="my-node" timeout={300}>
          <Routes>
            <Route
              path="/photos/:category"
              element={<Photos layout={layout} />}
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};
