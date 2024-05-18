import CartLink from "../features/cart/CartLink";
import Input from "../components/Input";
import UserDropDown from "../components/UserDropDown";
import Navbar from "../components/Navbar";

const Header = () => {
  return (
    <header className="relative px-5 py-6 border-b border-darkGray lg:px-16 z-10">
      <Navbar />
      <div className=" pt-6 flex justify-center gap-8 items-center lg:justify-end">
        <search className="w-full lg:w-1/3">
          <input
            name=""
            placeholder="Search"
            color="#5F5F5F"
            className={`w-full p-3 rounded-md placeholder-opacity-70 bg-transparent border text-gray border-gray placeholder-gray focus:outline-dark aria-[invalid=true]:border-red-400 aria-[invalid=true]:outline-red-400 aria-[invalid=true]:bg-red-100 aria-[invalid]:bg-opacity-40 lg:text-xl lg:p-4`}
          />
        </search>
        <CartLink />
        <UserDropDown />
      </div>
    </header>
  );
};

export default Header;
