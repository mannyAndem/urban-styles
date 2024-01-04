import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCustomer } from "../features/customer/customerSlice";
import userIcon from "../assets/icons/userIcon.png";
import arrowDown from "../assets/icons/arrow-down-icon.png";
import LogoutButton from "../features/customer/LogoutButton";

const UserDropDown = () => {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const customer = useSelector(selectCustomer);

  const toggleDropDownVisible = () => {
    setDropDownVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        {customer ? (
          <Link
            to="/profile"
            className="w-10 h-10 bg-dark rounded-full flex justify-center items-center text-xl text-lightPink font-medium"
          >
            {customer.first_name[0].toUpperCase()}
          </Link>
        ) : (
          <img src={userIcon} />
        )}
        <button onClick={toggleDropDownVisible}>
          <img
            src={arrowDown}
            className={`${
              dropDownVisible ? "rotate-180" : ""
            } transform transition duration-300 ease-out`}
          />
        </button>
      </div>
      <div
        className={`${
          dropDownVisible ? "scale-y-100" : "scale-y-0"
        } transform origin-top transition duration-300 ease-out right-0 top-[105%] absolute p-4 rounded-md bg-lightPink z-20 shadow-md whitespace-nowrap`}
      >
        {customer ? (
          <span className="flex gap-1 text-xl text-gray pb-4 items-center">
            Done shopping already?
            <LogoutButton />
          </span>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default UserDropDown;
