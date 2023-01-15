import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Sidebar from './Sidebar';

export const Layout = ({ children }) => {
  const { data: session } = useSession();

  return (
    <main className="">
      <div className="flex flex-col sm:flex-row">
        <Sidebar />

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
                scale: [0, 1],
              },
              exit: {
                scale: [1, 0],
              },
              initial: {
                scale: 0,
              },
              transition: {
                duration: 0.4,
                ease: [0.61, 1, 0.88, 1],
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
