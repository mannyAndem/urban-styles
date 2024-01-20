import { useDispatch, useSelector } from "react-redux";
import {
  completeCart,
  createPaymentSessions,
  selectCart,
  selectCompleteCartStatus,
  selectCreatePaymentSessionsStatus,
} from "./cartSlice";
import { useEffect } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import usePaystack from "../../hooks/usePaystack";
import { selectCustomer } from "../customer/customerSlice";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(selectCreatePaymentSessionsStatus);
  const completeCartStatus = useSelector(selectCompleteCartStatus);
  const customer = useSelector(selectCustomer);
  const cart = useSelector(selectCart);
  console.log(cart);

  const { status: paymentStatus, initiatePaystackPopup } = usePaystack();

  const handleClick = () => {
    initiatePaystackPopup(
      customer.email,
      cart.total,
      cart.payment_session.data.paystackTxRef
    );
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      dispatch(completeCart());
    }
    if (paymentStatus === "error") {
      toast.error("Could not process payment, please retry.");
    }
  }, [paymentStatus]);

  useEffect(() => {
    dispatch(createPaymentSessions());
  }, []);

  useEffect(() => {
    if (completeCartStatus === "success") {
      navigate("/complete");
    }
    if (completeCartStatus === "error") {
      toast.error("Could not place order");
    }
  }, [completeCartStatus]);

  return (
    <div>
      <Toaster />
      <h2 className="text-midXl">Payment Summary</h2>
      {status !== "pending" ? (
        <ul className="mt-8 flex flex-col gap-8">
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Subtotal</span>
            <span className="font-medium text-xl">
              N{(cart?.subtotal / 100).toLocaleString() ?? 0}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Shipping Fees</span>
            <span className="font-medium text-xl">
              N{(cart?.shipping_total / 100).toLocaleString()}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Taxes</span>
            <span className="font-medium text-xl">
              N{(cart?.tax_total / 100).toLocaleString()}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Total</span>
            <span className="font-medium text-xl">
              N{(cart?.total / 100).toLocaleString() ?? 0}
            </span>
          </li>
        </ul>
      ) : status === "pending" ? (
        <Loader type="lg" />
      ) : (
        <div></div>
      )}
      <div className="mt-16">
        <ButtonPrimary
          disabled={status === "pending"}
          pending={paymentStatus === "pending"}
          onClick={handleClick}
        >
          Place order
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default PaymentForm;
