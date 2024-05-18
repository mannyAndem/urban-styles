import Loader from "../../components/Loader";
import ButtonPrimary from "../../components/ButtonPrimary";
import toast, { Toaster } from "react-hot-toast";
import {
  useAddShippingMethodMutation,
  useGetShippingOptionsQuery,
} from "../api/apiSlice";
import { formatPrice } from "../../utils/formatPrice";
import { useEffect, useState } from "react";

const ChooseShippingOption = ({ nextStep }) => {
  const {
    data: options,
    isLoading,
    isSuccess,
    isError,
  } = useGetShippingOptionsQuery();

  const [
    addShippingMethod,
    {
      isSuccess: isAddSuccess,
      isError: isAddError,
      isLoading: isAddLoading,
      error: addError,
    },
  ] = useAddShippingMethodMutation();

  const [optionId, setOptionId] = useState("");

  const handleChange = (e) => {
    setOptionId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addShippingMethod(optionId);
  };

  useEffect(() => {
    if (isAddSuccess) {
      nextStep();
    }
    if (isAddError) {
      console.error(addError);
    }
  }, [isAddSuccess, isAddError]);
  return (
    <div>
      <Toaster />
      <h2 className="text-midXl">Choose Shipping Option</h2>
      <form className="mt-16 flex flex-col gap-4" onSubmit={handleSubmit}>
        {isSuccess ? (
          options.map((option, key) => (
            <div key={key} className="flex items-center gap-4">
              <input
                type="radio"
                className="appearance-none checked:bg-dark cursor-pointer rounded-full h-5 w-5 border-2 border-dark"
                id={option.id}
                value={option.id}
                name="shipping_option"
                checked={option.id === optionId}
                onChange={handleChange}
              />
              <label htmlFor={option.id} className="text-xl font-medium">
                {option.name} ({formatPrice(option.amount)})
              </label>
            </div>
          ))
        ) : isLoading ? (
          <Loader type="md" />
        ) : isError ? (
          <span className="block text-center text-red-400">{error}</span>
        ) : (
          <div></div>
        )}
        <div className="mt-16">
          <ButtonPrimary disabled={!optionId} pending={isAddLoading}>
            Proceed
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default ChooseShippingOption;
