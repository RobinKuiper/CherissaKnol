import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';
import { CategoryMenuItem } from '../CategoryMenuItem';
import { NavMenuItem } from '../NavMenuItem';
import { useMediaQuery } from '../../helpers/contexts';
import { CustomLink } from '../CustomLink';
import Image from 'next/image';
import { constants } from '../../helpers';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const pages = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Collabs',
    path: '/collabs',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
];

export default function Sidebar() {
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
              {pages.map((page) => (
                <NavMenuItem
                  key={page.path}
                  path={page.path}
                  title={page.label}
                  toggleCollapse={toggleCollapse}
                />
              ))}
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
  );
}
