import { useState } from "react";
import PaystackPop from "@paystack/inline-js";

const usePayStack = () => {
  const [status, setStatus] = useState("idle");

  const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const paystack = new PaystackPop();

  const initiatePaystackPopup = (email, amount, ref) => {
    setStatus("pending");
    return paystack.newTransaction({
      key,
      email,
      amount,
      ref,
      onSuccess(transaction) {
        setStatus("success");
      },
    });
  };

  return { status, initiatePaystackPopup };
};

export default usePayStack;
