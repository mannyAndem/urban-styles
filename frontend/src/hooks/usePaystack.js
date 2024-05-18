import { useState } from "react";
import PaystackPop from "@paystack/inline-js";

const usePayStack = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const paystack = new PaystackPop();

  const initiatePaystackPopup = (email, amount, ref, currency) => {
    setIsLoading(true);
    paystack.newTransaction({
      key,
      email,
      amount,
      ref,
      currency,
      onSuccess() {
        setIsLoading(false);
        setIsSuccess(true);
      },
      onCancel() {
        setIsLoading(false);
        setIsError(true);
      },
    });
  };

  return { isSuccess, isError, isLoading, initiatePaystackPopup };
};

export default usePayStack;
