import { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Sidebar } from './Components/Sidebar';
import { About, Collabs, Contact, Home, Photos } from './Pages';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const location = useLocation();
  const [layout, setLayout] = useState('default');
  const [menu, setMenu] = useState('default');

  const menuSwitcher = () => {
    const menus = ['default', 'vertical'];
    const currentMenuIndex = menus.indexOf(menu);

    const toggleMenu = () => {
      const nextMenuIndex = currentMenuIndex === 0 ? 1 : 0;
      setMenu(menus[nextMenuIndex]);
    }

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
    const layouts = ['default', 'full', 'full2', 'full3', 'black'];
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

  if (layout === 'default') {
    return (
      <div className="container mx-auto h-full">
        <div id="line" className='one'></div>
        <div id="line" className='two'></div>
        <div id="line" className='three'></div>
        {menuSwitcher()}
        {layoutSwitcher()}
        <div className="flex flex-row flex-wrap py-4 h-full">
          <aside className="w-full h-full sm:w-1/3 md:w-1/4 px-2">
            <div className="w-full h-full bg-white shadow-md shadow-black">
              <Sidebar menu={menu} />
            </div>
          </aside>

          <main
            role="main"
            className="w-full sm:w-2/3 md:w-3/4 pt-1 overflow-hidden"
          >
            <div className="ml-10 w-full h-2 bg-white shadow-lg shadow-black"></div>
            <div className="ml-10 pt-10">
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames="my-node"
                  timeout={300}
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/collabs" element={<Collabs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                      path="/photos/:category"
                      element={<Photos layout={layout} />}
                    />
                  </Routes>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </main>
        </div>
      </div>
    );
  } else if (layout === 'black') {
    return (
      <div
        className="h-full bg-contain bg-no-repeat bg-[#18181A]"
        style={{
          backgroundImage: 'url(/woman.jpg)',
        }}
      >
        {layoutSwitcher()}
        <div className="flex flex-row flex-wrap h-full">
          <aside className="w-full h-full md:w-1/5">
            <div className="mt-[50%] ml-14 w-[53%]">
              <div className="text-1md">
                <ul className="text-4xl space-y-2">
                  <li className="font-bold pl-2.5 text-sm mb-2">Categories</li>
                  <Link to="/photos/landscapes">
                  <li
                    className={`p-2 ease-in-out duration-500 mb-2 ${
                      1 === 2 && 'bg-orange-300'
                    } hover:bg-gray-500`}
                  >
                    Landscapes
                  </li>
                  </Link>
                  <Link to="/photos/still-life">
                  <li
                    className={`p-2 ease-in-out duration-500 mb-2 ${
                      1 === 2 && 'bg-orange-300'
                    } hover:bg-gray-500`}
                  >
                    Still-Life
                  </li>
                  </Link>
                  <Link to="/photos/nature">
                  <li
                    className={`p-2 ease-in-out duration-500 mb-2 ${
                      1 === 2 && 'bg-orange-300'
                    } hover:bg-gray-500`}
                  >
                    Nature
                  </li>
                  </Link>
                </ul>
              </div>
            </div>
          </aside>

          <main className="w-full h-full md:w-4/5">
            <div className="ml-28 mt-20 mr-10">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/collabs" element={<Collabs />} />
                <Route path="/contact" element={<Contact />} />

                <Route
                  path="/photos/:category"
                  element={<Photos layout={layout} />}
                />
              </Routes>
              </div>
          </main>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full">
        <div id="line" className='one'></div>
        <div id="line" className='two'></div>
        <div id="line" className='three'></div>
        {menuSwitcher()}
        {layoutSwitcher()}
        <div className="flex flex-row flex-wrap  h-full">
          <aside
            className={`w-full h-full sm:w-1/3 md:w-1/5 ${
              layout === 'full' ? '' : layout === 'full2' ? 'px-2' : 'px-5'
            }`}
          >
            <div className="top-0 w-full h-full bg-white shadow-lg shadow-black">
              <Sidebar menu={menu} />
            </div>
          </aside>

          <main
            role="main"
            id="content"
            className="w-full sm:w-2/3 md:w-4/5 pt-1 overflow-hidden"
          >
            <div className="mx-10 w-full h-2 bg-white shadow-lg shadow-black"></div>
            <div className="mx-10 pt-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/collabs" element={<Collabs />} />
                <Route path="/contact" element={<Contact />} />

                <Route
                  path="/photos/:category"
                  element={<Photos layout={layout} />}
                />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
