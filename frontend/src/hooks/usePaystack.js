import { useState } from "react";
import PaystackPop from "@paystack/inline-js";

const usePayStack = () => {
  const [status, setStatus] = useState();

  const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const paystack = new PaystackPop();

  const initiatePaystackPopup = (email, amount, ref) => {
    setStatus("pending");
    paystack.newTransaction({
      key,
      email,
      amount,
      ref,
      onSuccess() {
        setStatus("success");
      },
      onCancel() {
        setStatus("error");
      },
    });
  };

  return { status, initiatePaystackPopup };
};

export default usePayStack;
