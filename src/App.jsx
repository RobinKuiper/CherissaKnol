import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Components/Sidebar';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RouteProvider } from './Components';

function App() {
  const location = useLocation();
  const [layout, setLayout] = useState('full');
  const [menu, setMenu] = useState('default');

  const menuSwitcher = () => {
    const menus = ['default', 'vertical'];
    const currentMenuIndex = menus.indexOf(menu);

    const toggleMenu = () => {
      const nextMenuIndex = currentMenuIndex === 0 ? 1 : 0;
      setMenu(menus[nextMenuIndex]);
    };

    return (
      <button
        className="absolute bottom-0 right-[10%] bg-white text-black p-3"
        onClick={toggleMenu}
      >
        Switch Menu {currentMenuIndex + 1}/{menus.length}
      </button>
    );
  };

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
      <div className={`h-full ${layout === 'default' && 'container mx-auto'}`}>
        <div id="line" className="one"></div>
        <div id="line" className="two"></div>
        <div id="line" className="three"></div>
        {menuSwitcher()}
        {layoutSwitcher()}
        <div
          className={`flex flex-row flex-wrap h-full ${
            layout === 'default' && 'py-4'
          }`}
        >
          <aside
            className={`h-full ${
              layout === 'default'
                ? 'sm:w-1/3 md:w-1/4 px-2'
                : layout === 'full'
                ? 'md:w-1/5'
                : layout === 'full2'
                ? 'md:w-1/5 px-2'
                : 'md:w-1/5 px-5'
            }`}
          >
            <div className="h-full bg-white shadow-md shadow-black">
              <Sidebar menu={menu} />
            </div>
          </aside>

          <main
            role="main"
            className={`w-full sm:w-2/3 md:w-3/4 pt-1 ${
              layout !== 'default' && 'pl-10'
            }`}
          >
            <div
              className={`w-full h-2 bg-white shadow-lg shadow-black ${
                layout === 'default' && 'ml-10'
              }`}
            ></div>
            <div className={`pt-10 ${layout === 'default' && 'ml-10'}`}>
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames="my-node"
                  timeout={300}
                >
                  <RouteProvider layout={layout} />
                </CSSTransition>
              </TransitionGroup>
            </div>
          </main>
        </div>
      </div>
      <div className="absolute bottom-0 h-1 w-full bg-orange-400"></div>
    </>
  );
}

export default App;
