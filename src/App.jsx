import { useEffect, useRef, useState } from 'react';
import { Sidebar } from './Components/Sidebar';
import { RouteProvider } from './Components';

function App() {
  const [layout, setLayout] = useState('full');
  const [collapse, setCollapse] = useState(false);
  const firstRun = useRef(false);

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

  const layoutSwitcher = () => {
    const layouts = ['default', 'full', 'full2', 'full3'];
    const currentLayoutIndex = layouts.indexOf(layout);

    const toggleLayout = () => {
      const nextLayoutIndex =
        currentLayoutIndex === layouts.length - 1 ? 0 : currentLayoutIndex + 1;
      setLayout(layouts[nextLayoutIndex]);
    };

    return (
      <button
        className="absolute bottom-0 right-0 bg-white text-black p-3"
        onClick={toggleLayout}
      >
        Switch Layout {currentLayoutIndex + 1}/{layouts.length}
      </button>
    );
  };

  return (
    <>
      <div
        id="page"
        className={`sm:h-full ${layout === 'default' && 'container mx-auto'}`}
      >
        <div id="line" className="one"></div>
        <div id="line" className="two"></div>
        <div id="line" className="three"></div>
        {layoutSwitcher()}
        <div
          className={`flex flex-row flex-wrap h-full ${
            layout === 'default' && 'py-4'
          }`}
        >
          <aside
            className={`sticky top-0 ${
              layout === 'default'
                ? 'sm:w-1/3 md:w-1/4 px-2'
                : layout === 'full'
                ? 'md:w-1/5'
                : layout === 'full2'
                ? 'md:w-1/5 px-2'
                : 'md:w-1/5 px-5'
            }`}
          >
            <Sidebar
              toggleCollapse={() => setCollapse(!collapse)}
              collapse={collapse}
            />
          </aside>

          <main
            role="main"
            className={`w-full sm:w-2/3 md:w-3/4 pt-1 ${
              layout !== 'default' && 'sm:pl-10 p-2'
            }`}
          >
            <div
              className={`hidden sm:block w-full h-2 bg-white shadow-lg shadow-black ${
                layout === 'default' && 'ml-10'
              }`}
            ></div>
            <div className={`pt-3 sm:pt-10 ${layout === 'default' && 'ml-10'}`}>
              <RouteProvider layout={layout} />
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
