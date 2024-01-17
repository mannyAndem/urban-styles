import { useEffect, useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useDispatch, useSelector } from "react-redux";
import {
  completeCart,
  selectCart,
  selectCompleteCartStatus,
} from "../features/cart/cartSlice";
import axios from "../api/axios";

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
    });
  };

  return { status, initiatePaystackPopup };
};

export default usePayStack;
