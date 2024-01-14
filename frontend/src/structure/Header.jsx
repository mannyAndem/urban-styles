import CartLink from "../features/cart/CartLink";
import Input from "../components/Input";
import UserDropDown from "../components/UserDropDown";
import Navbar from "../components/Navbar";

const Header = () => {
  return (
    <header className="relative px-5 py-6 border-b border-darkGray lg:px-16">
      <Navbar />
      <div className=" pt-6 flex justify-center gap-8 items-center lg:justify-end">
        <search className="w-full lg:w-1/3">
          <Input placeholder="Search" color="#5F5F5F" />
        </search>
        <CartLink />
        <UserDropDown />
      </div>
    </header>
  );
};

export default Header;
