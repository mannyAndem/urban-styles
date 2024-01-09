import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addShippingMethod,
  selectAddShippingMethodError,
  selectAddShippingMethodStatus,
  selectCart,
} from "./cartSlice";
import Loader from "../../components/Loader";
import ButtonPrimary from "../../components/ButtonPrimary";
import toast, { Toaster } from "react-hot-toast";

const ChooseShippingOption = ({ nextStep }) => {
  const [options, setOptions] = useState();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const submitStatus = useSelector(selectAddShippingMethodStatus);
  const submitError = useSelector(selectAddShippingMethodError);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedOption) {
      toast.error("Please select a shipping option");
      return;
    }

    dispatch(addShippingMethod(selectedOption));
  };

  useEffect(() => {
    if (submitStatus === "success") {
      nextStep();
      return;
    }

    if (submitStatus === "error") {
      toast.error(submitError);
    }
  }, [submitStatus]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        if (cart) {
          const response = await axios.get(`/shipping-options/${cart.id}`);
          console.log(response);
          setOptions(response.data.shipping_options);
          setStatus("success");
          console.log(response);
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        if (err.code === "ERR_NETWORK") {
          setError("Can't connect to the internet");
        } else {
          setError("Something went wrong");
        }
      }
    };

    getOptions();
  }, []);
  return (
    <div>
      <Toaster />
      <h2 className="text-midXl">Choose Shipping Option</h2>
      <form className="mt-16 flex flex-col gap-4" onSubmit={handleSubmit}>
        {status === "success" ? (
          options.map((option, key) => (
            <div key={key} className="flex items-center gap-4">
              <input
                type="radio"
                className="appearance-none checked:bg-dark cursor-pointer rounded-full h-5 w-5 border-2 border-dark"
                id={option.id}
                value={option.id}
                name="shipping_option"
                onChange={handleChange}
              />
              <label htmlFor={option.id} className="text-xl font-medium">
                {option.name} (N{option.amount.toLocaleString()})
              </label>
            </div>
          ))
        ) : status === "pending" ? (
          <Loader type="md" />
        ) : status === "error" ? (
          <span className="block text-center text-red-400">{error}</span>
        ) : (
          <div></div>
        )}
        <div className="mt-16">
          <ButtonPrimary pending={submitStatus === "pending"}>
            Proceed
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default ChooseShippingOption;
