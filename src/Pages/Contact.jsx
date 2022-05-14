import { FaEnvelope, FaFacebook, FaInstagram, FaPhone } from 'react-icons/fa';

export const Contact = () => {
  return (
    <div>
      <div className="sm:flex flex-row mt-10 pr-40">
        <div className="sm:w-2/4">
          <div className="flex flex-col items-center space-y-8">
            <h1 className="text-4xl font-bold">My Socials</h1>
            <p className="text-xl flex flex-row space-x-4 items-center">
              <FaEnvelope />
              <span>test@example.com</span>
            </p>
            <p className="text-xl flex flex-row space-x-4">
              <FaPhone />
              <span>123-456-7891</span>
            </p>
            <p className="flex space-x-8 justify-center text-4xl">
              <FaFacebook className="cursor-pointer hover:text-orange-400 hover:scale-110" />
              <FaInstagram className="cursor-pointer hover:text-orange-400 hover:scale-110" />
            </p>
          </div>

          <div className="mt-10 sm:mt-36 text-xs flex flex-col items-center">
            <p className="text-sm">Company</p>
            <p>KVK: 123456789</p>
            <p>BTW: 123456789</p>
          </div>
        </div>
        <div className="sm:w-2/4 mt-10 sm:mt-auto">
          <h1 className="text-4xl font-bold mb-5">Get In Touch</h1>
          <form className="flex flex-col space-y-8">
            <label className="text-sm">Name</label>
            <input type="text" className="w-full" />
            <label className="text-sm">Email</label>
            <input type="email" className="w-full" />
            <label className="text-sm">Message</label>
            <textarea className="w-full" rows="6" />
            <button className="sendBtn relative w-full h-full block bg-orange-400 text-white font-bold py-2">
              <span className="z-30">Send</span>
              <div className="filler absolute top-0 left-0 ease-in-out duration-500 bg-red-400 z-10 w-0 h-0" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
