import { useDispatch, useSelector } from "react-redux";
import { logout, selectLogoutStatus } from "./customerSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLogoutStatus);

  const handleClick = () => {
    dispatch(logout());
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
