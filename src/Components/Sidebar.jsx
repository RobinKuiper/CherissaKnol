import { Link } from "react-router-dom";
import { CategoryMenuItem } from "./CategoryMenuItem";
import { NavMenuItem } from "./NavMenuItem";
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

export const Sidebar = ({ menu }) => {
  return (
    <div className="text-black relative h-full">
      <div className="">
        <div className="">
          <Link to="/">
            <img src="https://i.imgur.com/F4p34dJ.png" alt="logo" />
          </Link>
        </div>
      </div>

      {menu === "default" && ( 
      <div className="mt-5 flex space-x-10 flex-row justify-center content-around">
        <NavMenuItem path="/" title="Home" />
        {/* <span className="text-teal-800">/</span> */}
        <NavMenuItem path="/about" title="About" />
        <NavMenuItem path="/collabs" title="Collabs" />
        <NavMenuItem path="/contact" title="Contact" />
      </div>
      )}

      <div className="mt-16">
        <div className="text-1md">
          <ul className="text-3xl space-y-2">
            {menu === "vertical" ? (
              <>
              <CategoryMenuItem path='/' title='Home' />
              <CategoryMenuItem path='/photos/landscapes' title='Landscapes' />
            <CategoryMenuItem path='/photos/still-life' title='Still-Life' />
            <CategoryMenuItem path='/photos/nature' title='Nature' />
              <CategoryMenuItem path='/about' title='About' />
              <CategoryMenuItem path='/collabs' title='Collabs' />
              <CategoryMenuItem path='/contact' title='Contact' />
              </>
            ) : (
              <>
            <li className='font-bold pl-2.5 text-sm'>Categories</li>
            <CategoryMenuItem path='/photos/landscapes' title='Landscapes' />
            <CategoryMenuItem path='/photos/still-life' title='Still-Life' />
            <CategoryMenuItem path='/photos/nature' title='Nature' />
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

      <div className="absolute bottom-10 w-full">
        <div className="mt-5 flex space-x-5 flex-row justify-center content-around text-teal-800 text-2xl">
        <FaFacebook className="cursor-pointer ease-in-out duration-300 hover:text-orange-400" />
        <FaInstagram className="cursor-pointer ease-in-out duration-300 hover:text-orange-400" />
        <FaEnvelope className="cursor-pointer ease-in-out duration-300 hover:text-orange-400" />
      </div>
      </div>
    </div>
  );
};
