import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';
import { CategoryMenuItem } from '../CategoryMenuItem';
import { NavMenuItem } from '../NavMenuItem';
import { useMediaQuery } from '../../helpers/contexts';
import { CustomLink } from '../CustomLink';
import Image from 'next/image';
import Link from 'next/link';
import { constants } from '../../helpers';

export const Layout = ({ children }) => {
  const isBreakpoint = useMediaQuery(750);

  const [collapse, setCollapse] = useState(false);
  const firstRun = useRef(
    process.env.NODE_ENV === 'development' ? false : true
  );

  const toggleCollapse = () => {
    if (isBreakpoint) setCollapse(!collapse);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const aside = document.getElementsByTagName('aside')[0];
    const page = document.getElementsByTagName('main')[0];

    aside.classList.toggle('h-full');
    page.classList.toggle('h-full');

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
    <main className="sm:h-full">
      <div className="h-full flex flex-col sm:flex-row sm:flex-wrap">
        <aside className="sticky top-0 sm:w-3/12 md:w-1/5 z-40">
          <div id="sidebar" className="h-full bg-white shadow-md shadow-black">
            <div className="text-black h-full sm:relative">
              {/* Header */}
              <div className="flex flex-row justify-between">
                <div className="m-3 w-[25%] sm:w-full relative">
                  <CustomLink href="/">
                    <Image
                      src="https://i.imgur.com/F4p34dJ.png"
                      alt="logo"
                      className="cursor-pointer"
                      layout="intrinsic"
                      width="452px"
                      height="218px"
                    />
                  </CustomLink>
                </div>

                <button
                  id="hamburger"
                  className="block m-5 mr-10 sm:hidden"
                  onClick={toggleCollapse}
                >
                  <span className="hamburger__top-bun" />
                  <span className="hamburger__bottom-bun" />
                </button>
              </div>

              {/* Navigation */}
              <div
                id="nav"
                className="hidden mt-5 px-2 sm:flex sm:flex-row sm:flex-wrap justify-between content-around md:mx-5"
              >
                <NavMenuItem
                  path="/"
                  title="Home"
                  toggleCollapse={toggleCollapse}
                />
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

              {/* Categories */}
              <div id="categories" className="hidden mt-16 sm:block">
                <ul className="text-3xl space-y-2">
                  <li className="pl-2.5 text-sm font-bold">Categories</li>
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
                </ul>
              </div>

              {/* Socials */}
              <div
                id="socials"
                className="hidden absolute bottom-10 w-full sm:block"
              >
                <div className="flex flex-row justify-center content-around space-x-5 mt-5 text-2xl text-teal-800">
                  <a href={constants.FB_URL} target="_blank" rel="noreferrer">
                    <FaFacebook className="cursor-pointer ease-in-out duration-300 hover:text-orange-400" />
                  </a>
                  <a href={constants.IG_URL} target="_blank" rel="noreferrer">
                    <FaInstagram className="cursor-pointer ease-in-out duration-300 hover:text-orange-400" />
                  </a>
                  <a
                    href={`mailto:${constants.EMAIL}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaEnvelope className="cursor-pointer ease-in-out duration-300 hover:text-orange-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="h-full p-2 pt-1 pb-10 sm:px-10 sm:w-9/12 md:w-4/5 z-10">
          {/* White Line Spacer */}
          <div className="hidden h-2 bg-white shadow-lg shadow-black sm:block" />
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ type: 'linear' }}
            variants={{
              enter: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.61, 1, 0.88, 1],
                },
              },
              exit: {
                opacity: 0,
                x: 200,
                y: 0,
              },
              initial: {
                opacity: 0,
                y: 8,
              },
            }}
            className="h-full pt-3 sm:pt-10 text-white"
          >
            {children}
          </motion.div>
        </div>
      </div>
      {/* Lines */}
      <div id="line" className="one"></div>
      <div id="line" className="two"></div>
      <div id="line" className="three"></div>
      {/* Orange Footer Line */}
      <div
        id="footer-line"
        className="fixed bottom-0 w-full h-1 bg-orange-400 z-50"
        style={{ boxShadow: '0px -2px 10px 0px rgba(0,0,0,0.5)' }}
      />
    </main>
  );
};
