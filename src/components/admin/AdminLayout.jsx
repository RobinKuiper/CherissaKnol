import { motion } from 'framer-motion';
import {
  FaCartArrowDown,
  FaLayerGroup,
  FaPeopleArrows,
  FaPersonBooth,
  FaPhotoVideo,
  FaSignOutAlt,
} from 'react-icons/fa';
import { CategoryMenuItem } from '../CategoryMenuItem';
import { useMediaQuery } from '../../helpers/contexts';
import { CustomLink } from '../CustomLink';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

export const AdminLayout = ({ children }) => {
  const { data: session } = useSession();
  const isBreakpoint = useMediaQuery(750);

  const toggleCollapse = () => {
    if (isBreakpoint) {
      const hidden = document.getElementById('hidden');
      hidden.classList.toggle('hidden');

      const aside = document.getElementById('aside');
      aside.classList.toggle('min-h-screen');

      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('min-h-screen');
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
            className="bg-white shadow-lg shadow-black sm:relative"
          >
            <div className="text-black">
              {/* Header */}
              <div className="flex flex-row justify-between">
                <div className="m-3 w-[25%] sm:w-full relative">
                  <CustomLink href="/">
                    <Image
                      src="https://i.imgur.com/F4p34dJ.png"
                      alt="logo"
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

              <div id="hidden" className="hidden sm:block">
                {/* Categories */}
                <div id="categories" className="mt-16">
                  <ul className="text-3xl space-y-2">
                    <CategoryMenuItem
                      path="/admin/users"
                      title="Users"
                      icon={<FaPeopleArrows />}
                      toggleCollapse={toggleCollapse}
                    />
                    <li className="">
                      <hr />
                    </li>
                    <CategoryMenuItem
                      path="/admin/photos"
                      title="Photos"
                      icon={<FaPhotoVideo />}
                      toggleCollapse={toggleCollapse}
                    />
                    <li className="">
                      <hr />
                    </li>
                    <CategoryMenuItem
                      path="/admin/customers"
                      title="Customers"
                      icon={<FaPersonBooth />}
                      toggleCollapse={toggleCollapse}
                    />
                    <CategoryMenuItem
                      path="/admin/orders"
                      title="Orders"
                      icon={<FaCartArrowDown />}
                      toggleCollapse={toggleCollapse}
                    />
                  </ul>
                </div>
              </div>

              <div className="absolute bottom-5 left-0 right-0">
                <ul className="text-3xl space-y-2">
                  <li
                    className={`pl-5 p-2 ease-in-out duration-500 hover:pl-6 hover:bg-orange-300`}
                    onClick={toggleCollapse}
                  >
                    <button
                      className="flex items-center space-x-4"
                      onClick={signOut}
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-h-screen p-2 pt-1 pb-10 sm:px-10 sm:w-9/12 md:w-4/5 z-10">
          {/* White Line Spacer */}
          <motion.div
            // initial="initial"
            // animate="enter"
            // exit="exit"
            // transition={{ type: 'linear' }}
            // variants={{
            //   enter: {
            //     opacity: 1,
            //     y: 0,
            //     transition: {
            //       duration: 0.4,
            //       ease: [0.61, 1, 0.88, 1],
            //     },
            //   },
            //   exit: {
            //     opacity: 0,
            //     x: 200,
            //     y: 0,
            //   },
            //   initial: {
            //     opacity: 0,
            //     y: 8,
            //   },
            // }}
            className="h-full text-white"
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
        className="fixed bottom-0 w-full h-1 bg-teal-800 z-50"
        style={{ boxShadow: '0px -2px 10px 0px rgba(0,0,0,0.5)' }}
      />
    </main>
  );
};
