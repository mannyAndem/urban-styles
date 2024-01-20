import { Link } from "react-router-dom";
import loginImg from "../../assets/images/hero-3.png";
import logo from "../../assets/brand/logo.png";
import LoginForm from "../../features/customer/LoginForm";

const Login = () => {
  return (
    <div className="flex text-dark">
      <div className="w-full hidden lg:block">
        <img
          src={loginImg}
          className="w-full h-full object-cover"
          alt="Man posing with black hoodie"
        />
      </div>
      <div className="p-8 w-full">
        <Link to="/" className="mb-8 flex justify-end">
          <img src={logo} />
        </Link>
        <h1 className="text-midXl">Login</h1>
        <div className="mt-8">
          <LoginForm />
        </div>
        <span className="mt-8 text-xl block text-center text-gray">
          New to Urban Styles?{" "}
          <Link to="/signup" className="text-dark font-medium underline">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
