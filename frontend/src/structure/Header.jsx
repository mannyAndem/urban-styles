import { NavLink } from "react-router-dom";
import logo from "../assets/brand/logo.png";
import CartLink from "../features/cart/CartLink";
import Input from "../components/Input";
import UserDropDown from "../components/UserDropDown";

const Header = () => {
  return (
    <header className="relative px-16 py-6 border-b border-darkGray">
      <nav className="pb-6 flex items-center justify-between border-b border-darkGray">
        <div>
          <img src={logo} />
        </div>
        <ul className="flex items-center gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                `${isActive ? "font-medium" : ""} uppercase text-dark text-xl`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                `${isActive ? "font-medium" : ""} uppercase text-dark text-xl`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive, isPending }) =>
                `${isActive ? "font-medium" : ""} uppercase text-dark text-xl`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wishlist"
              className={({ isActive, isPending }) =>
                `${isActive ? "font-medium" : ""} uppercase text-dark text-xl`
              }
            >
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive, isPending }) =>
                `${isActive ? "font-medium" : ""} uppercase text-dark text-xl`
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className=" pt-6 flex justify-end gap-8 items-center">
        <search className="w-1/3">
          <Input placeholder="Search" color="#5F5F5F" />
        </search>
        <CartLink />
        <UserDropDown />
      </div>
    </header>
  );
};

export default Header;
