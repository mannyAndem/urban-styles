import { Link } from "react-router-dom";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ButtonSecondary from "../../../components/ButtonSecondary";

const LoginModal = ({ isOpen, close }) => {
  const handleClick = (e) => {
    if (e.currentTarget.id === "modal-backdrop") {
      close();
    }
  };
  return (
    <div
      onClick={handleClick}
      className={` ${
        isOpen ? "scale-100" : "scale-0"
      } origin-center p-5 fixed top-0 left-0 z-50 w-screen h-screen bg-dark bg-opacity-60 flex items-center justify-center lg:p-16`}
      id="modal-backdrop"
    >
      <div className="w-full max-w-[600px] p-5 bg-lightPink shadow-sm rounded-lg lg:w-1/2 lg:p-16">
        <h3 className="text-2xl font-medium mb-4 lg:text-4xl">
          You aren't logged in :(
        </h3>
        <p className="text-base mb-16 lg:text-xl">
          How would you like to continue?
        </p>
        <div className="space-y-4">
          <Link to="/login" state={{ from: "/cart" }} className="block">
            <ButtonPrimary>Login</ButtonPrimary>
          </Link>
          <Link to="/guest" className="block">
            <ButtonSecondary>Continue as guest</ButtonSecondary>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
