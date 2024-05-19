import { Link } from "react-router-dom";
import notFoundImg from "../../assets/images/404.png";

const NotFound = () => {
  return (
    <div className="p-16  flex flex-col justify-center items-center">
      <img src={notFoundImg} alt="404" className="w-80 object-cover" />
      <p className="text-2xl text-center text-dark">
        We can't seem to find the page you're looking for.{" "}
        <Link className="font-medium underline" to="/">
          Go back home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
