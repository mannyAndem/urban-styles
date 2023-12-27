import { Link, NavLink } from "react-router-dom";
import logo from "../assets/brand/logo.png";
import userIcon from "../assets/icons/userIcon.png";
import arrowDown from "../assets/icons/arrow-down-icon.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/AuthSlice";
import LogoutButton from "../features/auth/LogoutButton";
import CartLink from "../features/cart/CartLink";
import Input from "../components/Input";

const Header = () => {
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  const toggleAuthModal = () => {
    setAuthModalVisible((prev) => !prev);
  };

  return (
    <header className="relative px-16 py-6 border-b border-darkGray">
      <nav className="pb-6 flex items-center justify-between border-b border-darkGray">
        <div>
          <img src={logo} />
        </div>
        <ul className="flex items-center gap-8">
          <li>
            <NavLink to="/" className={`uppercase text-dark text-xl`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={`uppercase text-dark text-xl`}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={`uppercase text-dark text-xl`}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/wishlist" className={`uppercase text-dark text-xl`}>
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={`uppercase text-dark text-xl`}>
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className=" pt-6 flex justify-end gap-8 items-center">
        <search className="w-1/3">
          <Input placeholder="Search" />
        </search>
        <CartLink />
        <button onClick={toggleAuthModal} className="flex items-center gap-1">
          {currentUser ? (
            <div className="w-10 h-10 bg-dark rounded-full flex justify-center items-center text-xl text-lightPink font-medium">
              {currentUser.first_name[0].toUpperCase()}
            </div>
          ) : (
            <img src={userIcon} />
          )}
          <img
            src={arrowDown}
            className={`${
              authModalVisible ? "rotate-180" : ""
            } transform transition duration-300 ease-out`}
          />
        </button>
      </div>
      <UserAuthModal
        visible={authModalVisible}
        toggleAuthModal={toggleAuthModal}
      />
    </header>
  );
};

export default Header;

const UserAuthModal = ({ visible }) => {
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser) {
    return (
      <div
        className={`${
          visible ? "scale-y-100" : "scale-y-0"
        } transfrom origin-top transition duration-300 ease-out right-16 top-[105%] absolute p-4 rounded-md bg-lightPink z-20 shadow-md`}
      >
        <span className="flex gap-1 text-xl text-gray pb-4 items-center">
          Done shopping already?
          <LogoutButton />
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${
        visible ? "scale-y-100" : "scale-y-0"
      } transfrom origin-top transition duration-300 ease-out right-16 top-[105%] absolute p-4 rounded-md bg-lightPink z-20 shadow-md`}
    >
      <span className="block text-xl text-gray pb-4 border-b border-lightGray">
        Already have an account?{" "}
        <Link to="/login" className="text-dark font-medium underline">
          Login
        </Link>
      </span>
      <span className="block text-xl text-gray pt-4">
        New here?{" "}
        <Link to="/signup" className="text-dark font-medium underline">
          Register
        </Link>
      </span>
    </div>
  );
};
