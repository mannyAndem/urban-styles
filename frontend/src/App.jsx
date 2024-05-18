import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Main from "./structure/Main";
import NotFound from "./pages/NotFound/NotFound";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRegion, setCustomer } from "./features/customer/customerSlice";
import Loader from "./components/Loader";
import { useGetCustomerQuery } from "./features/api/apiSlice";
import SelectRegion from "./features/customer/SelectRegion";
import Guest from "./pages/Guest/Guest";

function App() {
  const { data, isSuccess, isError, isLoading, error } = useGetCustomerQuery();
  const dispatch = useDispatch();

  const region = useSelector(selectRegion);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCustomer(data.customer));
    }
    if (isError) {
      dispatch(setCustomer(null));
    }
  }, [isSuccess, isError]);

  return (
    <div className="min-h-screen bg-lightPink overflow-x-hidden">
      {!region ? (
        <SelectRegion />
      ) : isSuccess || isError ? (
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : isLoading ? (
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
