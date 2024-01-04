import { useSelector } from "react-redux";
import { selectCustomer } from "../features/customer/customerSlice";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const customer = useSelector(selectCustomer);
  const { pathname } = useLocation();
  console.log(pathname);

  if (!customer) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
