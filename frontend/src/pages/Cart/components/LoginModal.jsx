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
      className={` ${
        isOpen ? "scale-100" : "scale-0"
      } origin-center p-16 fixed top-0 left-0 z-50 w-screen h-screen bg-dark bg-opacity-60 flex items-center justify-center`}
    >
      <div className="w-1/2 max-w-[600px] p-16 bg-lightPink shadow-sm rounded-lg">
        <h3 className="text-4xl font-medium mb-4">You aren't logged in :(</h3>
        <p className="text-xl mb-16">How would you like to continue?</p>
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
