import { useEffect } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import usePaystack from "../../hooks/usePaystack";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useCompleteCartMutation,
  useCreatePaymentSessionsMutation,
} from "../api/apiSlice";
import { formatPrice } from "../../utils/formatPrice";
import { useDispatch } from "react-redux";
import { clearAddedVariants } from "./cartSlice";

const PaymentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createPaymentSessions, { isSuccess, isLoading, isError, data: cart }] =
    useCreatePaymentSessionsMutation();

  const [
    completeCart,
    {
      isSuccess: isCompleteSuccess,
      isError: isCompleteError,
      isLoading: isCompleteLoading,
      data: completedCart,
      error: completeError,
    },
  ] = useCompleteCartMutation();

  const {
    isSuccess: isPaymentSuccess,
    isLoading: isPaymentLoading,
    isError: isPaymentError,
    initiatePaystackPopup,
  } = usePaystack();

  const handleClick = () => {
    initiatePaystackPopup(
      cart.email,
      cart.total,
      cart.payment_session.data.paystackTxRef,
      cart.region.currency_code.toUpperCase()
    );
  };

  useEffect(() => {
    createPaymentSessions();
  }, []);

  useEffect(() => {
    if (isPaymentSuccess) {
      completeCart();
      localStorage.removeItem("cart_id");
      dispatch(clearAddedVariants());
    }
    if (isPaymentError) {
      toast.error("Could not process payment, please retry.");
    }
  }, [isPaymentSuccess, isPaymentError]);

  useEffect(() => {
    if (isCompleteSuccess) {
      setTimeout(() => {
        navigate("/complete");
      }, 1000);
    }
    if (isCompleteError) {
      console.error(completeError);
      toast.error("Something went wrong");
    }
  }, [isCompleteError, isCompleteSuccess]);

  return (
    <div>
      <Toaster />
      <h2 className="text-midXl">Payment Summary</h2>
      {isSuccess ? (
        <ul className="mt-8 flex flex-col gap-8">
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Subtotal</span>
            <span className="font-medium text-xl">
              {formatPrice(cart.subtotal)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Shipping Fees</span>
            <span className="font-medium text-xl">
              {formatPrice(cart.shipping_total)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Taxes</span>
            <span className="font-medium text-xl">
              {formatPrice(cart.tax_total)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Total</span>
            <span className="font-medium text-xl">
              {formatPrice(cart.total)}
            </span>
          </li>
        </ul>
      ) : isLoading ? (
        <div className="py-5">
          <Loader type="lg" />
        </div>
      ) : (
        <div></div>
      )}
      <div className="mt-16">
        <ButtonPrimary
          disabled={isLoading}
          pending={isPaymentLoading}
          onClick={handleClick}
        >
          Place order
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default PaymentForm;
