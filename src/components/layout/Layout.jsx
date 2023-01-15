import { motion } from 'framer-motion';
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';
import { CategoryMenuItem } from '../CategoryMenuItem';
import { NavMenuItem } from '../NavMenuItem';
import { useMediaQuery } from '../../helpers/contexts';
import { CustomLink } from '../CustomLink';
import Image from 'next/image';
import { constants } from '../../helpers';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const Layout = ({ children }) => {
  const { data: session } = useSession();
  const { data: categories, error } = useSWR('/api/categories', fetcher);
  const isBreakpoint = useMediaQuery(750);

  const toggleCollapse = () => {
    if (isBreakpoint) {
      const hidden = document.getElementById('hidden');
      hidden.classList.toggle('hidden');

      const aside = document.getElementById('aside');
      aside.classList.toggle('min-h-screen');

      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('min-h-screen');

      const hamburger = document.getElementById('hamburger');
      hamburger.classList.toggle('open');
    }
  };

  return (
    <main className="">
      <div className="flex flex-col sm:flex-row">
        <aside
          id="aside"
          className="sm:flex sticky top-0 sm:w-3/12 md:w-1/5 sm:min-h-screen z-40"
        >
          <div
            id="sidebar"
            className="bg-white shadow-md shadow-black sm:relative w-96"
          >
            <div className="text-black">
              {/* Header */}
              <div className="flex flex-row justify-between">
                <div
                  className="m-3 w-[25%] sm:w-full relative"
                  style={{ textAlign: 'center' }}
                >
                  <CustomLink href="/">
                    <Image
                      src="https://i.imgur.com/G9Ac9oI.gif"
                      alt="logo"
                      layout="intrinsic"
                      width="250px"
                      height="250px"
                    />
                    {/* <Image
                      src="https://i.imgur.com/Bx41tAe.png"
                      alt="logo"
                      layout="intrinsic"
                      width="452px"
                      height="218px"
                    /> */}
                  </CustomLink>
                </div>

                <button
                  id="hamburger"
                  className="block m-5 mr-10 sm:hidden"
                  onClick={toggleCollapse}
                >
                  <span className="hamburger__top-bun" />
                  <span className="hamburger__middle-bun" />
                  <span className="hamburger__bottom-bun" />
                </button>
              </div>

              <div id="hidden" className="hidden sm:block">
                {/* Navigation */}
                <div
                  id="nav"
                  className="mt-5 px-2 flex flex-row flex-wrap justify-between content-around md:mx-5"
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
                <div id="categories" className="mt-16">
                  <ul className="text-3xl space-y-2">
                    <li className="pl-2.5 text-sm font-bold">Categories</li>
                    {categories &&
                      categories.map((category) => (
                        <CategoryMenuItem
                          key={category.id}
                          path={`/photos/${category.slug}`}
                          title={category.name}
                          toggleCollapse={toggleCollapse}
                        />
                      ))}
                  </ul>
                </div>
                {/* Socials */}
                <div id="socials" className="absolute bottom-10 w-full">
                  <div className="flex flex-row justify-center content-around space-x-5 mt-5 text-2xl text-[#996515]">
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
          </div>
        </aside>

        <div className="min-h-screen p-2 pt-1 pb-10 sm:px-10 sm:w-9/12 md:w-4/5 z-10">
          {/* White Line Spacer */}
          <div className="hidden h-2 bg-white shadow-lg shadow-black sm:block" />
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ type: 'linear' }}
            variants={{
              enter: {
                // opacity: 1,
                // y: 0,
                // transition: {
                //   duration: 0.4,
                //   ease: [0.61, 1, 0.88, 1],
                // },
                scale: [0, 1],
              },
              exit: {
                // opacity: 0,
                // x: 200,
                // y: 0,
                scale: [1, 0],
              },
              initial: {
                // opacity: 0,
                // y: 8,
                scale: 0,
              },
              transition: {
                duration: 0.4,
                ease: [0.61, 1, 0.88, 1],
                // duration: 0.4,
              },
            }}
            className="h-full pt-3 sm:pt-10 text-white"
          >
            {children}
          </motion.div>
        </div>
      </div>

      {session && (
        <Link href="/admin">
          <a className="fixed bottom-0 right-0 m-5 bg-orange-400 p-3 cursor-pointer z-50">
            Admin
          </a>
        </Link>
      )}

      {/* Lines */}
      {/* <div id="line" className="one"></div> */}
      {/* <div id="line" className="two"></div> */}
      {/* <div id="line" className="three"></div> */}
      {/* Orange Footer Line */}
      <div
        id="footer-line"
        className="fixed bottom-0 w-full h-1 bg-orange-400 z-50"
        style={{
          boxShadow: '0px -2px 10px 0px rgba(0,0,0,0.5)',
          background: 'white', //'#C5B358',
        }}
      />
    </main>
  );
};
