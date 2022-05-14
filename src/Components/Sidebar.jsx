import { Link } from 'react-router-dom';
import { CategoryMenuItem } from './CategoryMenuItem';
import { NavMenuItem } from './NavMenuItem';
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useEffect } from 'react';

export const Sidebar = ({ menu, toggleCollapse, collapse }) => {
  useEffect(() => {}, [collapse]);

  return (
    <div id="sidebar" className="h-full bg-white shadow-md shadow-black">
      <div className="text-black h-full sm:relative">
        <div className="flex flex-row justify-between">
          <div className="m-3 w-[25%] sm:w-full">
            <Link to="/">
              <img src="https://i.imgur.com/F4p34dJ.png" alt="logo" />
            </Link>
          </div>

          <button
            id="hamburger"
            className="block m-5 mr-10 sm:hidden"
            onClick={() => toggleCollapse()}
          >
            <span class="hamburger__top-bun"></span>
            <span class="hamburger__bottom-bun"></span>
          </button>
        </div>

        {menu === 'default' && (
          <div
            id="nav"
            className="mt-5 space-x-10 flex-row justify-center content-around hidden sm:flex"
          >
            <NavMenuItem
              path="/"
              title="Home"
              toggleCollapse={toggleCollapse}
            />
            {/* <span className="text-teal-800">/</span> */}
            <NavMenuItem
              path="/about"
              title="About"
              toggleCollapse={toggleCollapse}
            />
            <NavMenuItem
              path="/collabs"
              title="Collabs"
              toggleCollapse={toggleCollapse}
            />
            <NavMenuItem
              path="/contact"
              title="Contact"
              toggleCollapse={toggleCollapse}
            />
          </div>
        )}

        <div id="categories" className="mt-16 hidden sm:block">
          <div className="text-1md">
            <ul className="text-3xl space-y-2">
              {menu === 'vertical' ? (
                <>
                  <CategoryMenuItem
                    path="/"
                    title="Home"
                    toggleCollapse={toggleCollapse}
                  />
                  <CategoryMenuItem
                    path="/photos/landscapes"
                    title="Landscapes"
                    toggleCollapse={toggleCollapse}
                  />
                  <CategoryMenuItem
                    path="/photos/still-life"
                    title="Still-Life"
                    toggleCollapse={toggleCollapse}
                  />
                  <CategoryMenuItem
                    path="/photos/nature"
                    title="Nature"
                    toggleCollapse={toggleCollapse}
                  />
                  <CategoryMenuItem
                    path="/about"
                    title="About"
                    toggleCollapse={toggleCollapse}
                  />
                  <CategoryMenuItem
                    path="/collabs"
                    title="Collabs"
                    toggleCollapse={toggleCollapse}
                  />
                  <CategoryMenuItem
                    path="/contact"
                    title="Contact"
                    toggleCollapse={toggleCollapse}
                  />
                </>
              ) : (
                <>
                  <li className="font-bold pl-2.5 text-sm">Categories</li>
                  <CategoryMenuItem
                    path="/photos/landscapes"
                    title="Landscapes"
                    toggleCollapse={toggleCollapse}
                  />
                  <CategoryMenuItem
                    path="/photos/still-life"
                    title="Still-Life"
                    toggleCollapse={toggleCollapse}
                  />
                  <CategoryMenuItem
                    path="/photos/nature"
                    title="Nature"
                    toggleCollapse={toggleCollapse}
                  />
                </>
              )}
            </ul>
          </div>
        </div>

        {/* <div className="mt-20">
        <div className="text-1md">
          <ul className="text-3xl space-y-2">
            <li className='font-bold pl-2.5 text-sm'>Navigation</li>
            <MenuItem path='/' title='Home' />
            <MenuItem path='/about' title='About' />
            <MenuItem path='/contact' title='Contact' />
          </ul>
        </div>
      </div> */}

        <div id="socials" className="absolute bottom-10 w-full hidden sm:block">
          <div className="mt-5 flex space-x-5 flex-row justify-center content-around text-teal-800 text-2xl">
            <FaFacebook className="cursor-pointer ease-in-out duration-300 hover:text-orange-400" />
            <FaInstagram className="cursor-pointer ease-in-out duration-300 hover:text-orange-400" />
            <FaEnvelope className="cursor-pointer ease-in-out duration-300 hover:text-orange-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
