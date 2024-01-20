import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Main from "./structure/Main";
import NotFound from "./pages/NotFound/NotFound";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomer,
  selectCustomerStatus,
} from "./features/customer/customerSlice";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const status = useSelector(selectCustomerStatus);

  useEffect(() => {
    dispatch(getCustomer());
  }, []);

  return (
    <div className="min-h-screen bg-lightPink">
      {status === "success" ? (
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : status === "pending" ? (
        <div className="h-screen">
          <Loader type="lg" />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
