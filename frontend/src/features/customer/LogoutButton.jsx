import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../api/apiSlice";

const LogoutButton = () => {
  const [logout] = useLogoutMutation();

  const handleClick = () => {
    logout();
  };

  return (
    <button
      onClick={handleClick}
      className="text-xl text-dark font-medium underline"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
