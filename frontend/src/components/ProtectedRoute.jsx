import { useSelector } from "react-redux";
import { selectCustomer } from "../features/customer/customerSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const customer = useSelector(selectCustomer);

  if (!customer) {
    return <Navigate to="login" />;
  }

  return children;
};

export default ProtectedRoute;
