import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaRegCopyright,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">NewsHub</h2>
          <p className="text-gray-400 mt-1">
            Stay updated with the latest news
          </p>
        </div>
        <div className="flex gap-5 text-2xl my-5 md:my-0">
          <FaFacebook className="hover:text-blue-500 cursor-pointer transition-all duration-300" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer transition-all duration-300" />
          <FaTwitter className="hover:text-sky-500 cursor-pointer transition-all duration-300" />
        </div>
      </div>
      <div className="border-t border-gray-700 py-3 text-center text-gray-400">
        © 2026 NewsHub. All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
