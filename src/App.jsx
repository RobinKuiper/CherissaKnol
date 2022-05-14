import { useEffect, useRef, useState } from 'react';
import { Sidebar } from './Components/Sidebar';
import { RouteProvider } from './Components';

function App() {
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimenion]);

  const [collapse, setCollapse] = useState(false);
  const firstRun = useRef(
    process.env.NODE_ENV === 'development' ? false : true
  );

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const aside = document.getElementsByTagName('aside')[0];
    const page = document.getElementById('page');
    const footerLine = document.getElementById('footer-line');

    aside.classList.toggle('h-full');
    page.classList.toggle('h-full');
    footerLine.classList.toggle('sticky');
    footerLine.classList.toggle('fixed');

    const nav = document.getElementById('nav');
    const categories = document.getElementById('categories');
    const socials = document.getElementById('socials');

    nav.classList.toggle('hidden');
    nav.classList.toggle('flex');

    categories.classList.toggle('hidden');
    socials.classList.toggle('hidden');

    const hamburger = document.getElementById('hamburger');
    hamburger.classList.toggle('open');

    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('nav-sticky');
  }, [collapse]);

  return (
    <>
      <div id="page" className={`sm:h-full`}>
        <div id="line" className="one"></div>
        <div id="line" className="two"></div>
        <div id="line" className="three"></div>
        <div className={`sm:flex sm:flex-row flex-wrap h-full`}>
          <aside className={`sticky top-0 sm:w-3/12 md:w-1/5`}>
            <Sidebar
              toggleCollapse={() => {
                if (windowDimenion.winWidth < 640) {
                  setCollapse(!collapse);
                }
              }}
              collapse={collapse}
            />
          </aside>

          <main
            role="main"
            className={`w-full sm:w-9/12 md:w-4/5 pt-1 sm:px-10 p-2`}
          >
            <div
              className={`hidden sm:block w-full h-2 bg-white shadow-lg shadow-black`}
            />
            <div className={`pt-3 sm:pt-10`}>
              <RouteProvider />
            </div>
          </main>
        </div>
      </div>
      <div
        id="footer-line"
        className="sticky sm:absolute bottom-0 h-1 w-full bg-orange-400"
        style={{
          boxShadow: '0px -2px 10px 0px rgba(0,0,0,0.5)',
        }}
      ></div>
    </>
  );
}

export default App;
