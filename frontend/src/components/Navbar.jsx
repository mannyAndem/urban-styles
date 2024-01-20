import { NavLink } from "react-router-dom";
import logo from "../assets/brand/logo.png";
import hamburger from "../assets/icons/menu.png";
import { useState } from "react";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <nav className="pb-6 flex items-center justify-between border-b border-darkGray">
      <div>
        <img src={logo} />
      </div>
      <button onClick={toggleExpanded} className="lg:hidden z-30">
        <img src={hamburger} />
      </button>
      <ul
        className={`${
          expanded ? "scale-x-100" : "scale-x-0"
        } origin-right transform transition-all duration-300 ease-out absolute z-20 top-0 right-0 pt-24 flex w-[60vw] bg-lightPink flex-col h-screen items-center gap-8 lg:static lg:bg-transparent lg:pt-0 lg:flex-row lg:h-auto lg:w-auto lg:scale-x-100`}
      >
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
  );
};

export default Navbar;
