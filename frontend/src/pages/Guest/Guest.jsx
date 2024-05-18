import { Link } from "react-router-dom";
import guestImg from "../../assets/images/hero-3.png";
import logo from "../../assets/brand/logo.png";
import LoginForm from "../../features/customer/LoginForm";
import GuestForm from "./components/GuestForm";

const Guest = () => {
  return (
    <div className="flex text-dark h-screen">
      <div className="w-full hidden lg:block">
        <img
          src={guestImg}
          className="w-full h-full object-cover"
          alt="Man posing with black hoodie"
        />
      </div>
      <div className="p-8 w-full">
        <Link to="/" className="mb-8 flex justify-end">
          <img src={logo} />
        </Link>
        <h1 className="text-midXl">Guest</h1>
        <p className="text-xl mt-2">
          While you do not need to create an account, we do need an email to
          associate your cart with.
        </p>
        <div className="mt-8">
          <GuestForm />
        </div>
      </div>
    </div>
  );
};

export default Guest;
