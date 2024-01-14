import { Link } from "react-router-dom";
import logo from "../assets/brand/logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-dark p-5 text-lightPink lg:p-16">
      <div className="mb-16 flex items-center gap-12 ">
        <hr className="bg-lightPink h-[1px] w-full border-none rounded-md" />
        <img src={logo} />
        <hr className="bg-lightPink h-[1px] w-full border-none rounded-md" />
      </div>
      <div className="flex justify-center py-8 border-y border-lightPink">
        <ul className="grid grid-cols-3 items-center gap-4 lg:gap-8 lg:flex">
          <li>
            <Link to="/" className="text-xl uppercase ">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-xl uppercase ">
              About
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-xl uppercase ">
              Products
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="text-xl uppercase ">
              Wishlist
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-xl uppercase ">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-xl uppercase ">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col py-8 border-b border-lightPink lg:flex-row">
        <div className="w-full py-8">
          <h2 className="text-xl text-center mb-8">CONTACT</h2>
          <ul className="flex flex-col gap-1">
            <li className="text-xl text-center">
              Email: support@urbanstyles.com
            </li>
            <li className="text-xl text-center">
              Phone: (555) 555-5555, (222) 222-2222
            </li>
            <li className="text-xl text-center">
              No. 22, Lekki Ajah Complex Hall
            </li>
          </ul>
        </div>
        <div className="border-y border-lightPink w-full py-8 lg:border-x">
          <h2 className="text-xl text-center mb-8">SOCIALS</h2>
          <ul className="flex flex-col gap-1">
            <li className="text-xl text-center">Twitter</li>
            <li className="text-xl text-center">Instagram</li>
            <li className="text-xl text-center">Facebook</li>
          </ul>
        </div>
        <div className="w-full py-8">
          <h2 className="text-xl text-center mb-8">BUSINESS HOURS</h2>
          <ul className="flex flex-col gap-1">
            <li className="text-xl text-center">
              Monday to Friday: 9:00AM to 6:00PM (EST)
            </li>
            <li className="text-xl text-center">
              Saturday 12:00PM: to 6:00PM est
            </li>
            <li className="text-xl text-center">Closed on Sundays</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 flex justify-center items-center">
        <span className="text-xl block">&copy; URBAN STYLES, 2023</span>
      </div>
    </footer>
  );
};

export default Footer;
