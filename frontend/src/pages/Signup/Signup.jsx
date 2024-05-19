import signupImg from "../../assets/images/hero-1.png";
import logo from "../../assets/brand/logo.png";
import SignupForm from "../../features/customer/SignupForm";
import { Link, useLocation } from "react-router-dom";

const Signup = () => {
  const { state } = useLocation();

  return (
    <div className="flex  text-dark">
      <div className="w-full hidden lg:block">
        <img
          src={signupImg}
          className="w-full h-full object-cover"
          alt="Man posing with black hoodie"
        />
      </div>
      <div className="p-8 w-full">
        <Link to="/" className="mb-8 flex justify-end">
          <img src={logo} />
        </Link>
        <h1 className="text-midXl">Signup</h1>
        <div className="mt-8">
          <SignupForm />
        </div>
        <span className="mt-8 text-xl block text-center text-gray">
          Already have an account?{" "}
          <Link
            to="/login"
            state={{ ...state }}
            className="text-dark font-medium underline"
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
