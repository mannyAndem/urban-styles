import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentSessions,
  selectCart,
  selectCreatePaymentSessionsStatus,
} from "./cartSlice";
import { useEffect } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import usePaystack from "../../hooks/usePaystack";
import { selectCustomer } from "../customer/customerSlice";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectCreatePaymentSessionsStatus);
  const customer = useSelector(selectCustomer);
  const cart = useSelector(selectCart);
  console.log(cart);
  console.log(status);

  const { status: paymentStatus, initiatePaystackPopup } = usePaystack();

  const handleClick = () => {
    initiatePaystackPopup(
      customer.email,
      cart.total,
      cart.payment_sessions[0].data.paystackTxRef
    );
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      toast.success("Let's goooooooooooooo");
      dispatch(); //DISPATCH THE COMPLETE CART ACTION, PLACE ORDER AND COMPLETE THIS FUCKING PROJECT
    }
    if (paymentStatus === "error") {
      toast.error("Could not process payment, please retry.");
    }
  }, [paymentStatus]);

  useEffect(() => {
    dispatch(createPaymentSessions());
  }, []);

  return (
    <div>
      <Toaster />
      <h2 className="text-midXl">Payment Summary</h2>
      {status === "success" ? (
        <ul className="mt-8 flex flex-col gap-8">
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Subtotal</span>
            <span className="font-medium text-xl">
              N{cart?.subtotal.toLocaleString() ?? 0}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Shipping Fees</span>
            <span className="font-medium text-xl">
              N{cart?.shipping_total.toLocaleString()}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Taxes</span>
            <span className="font-medium text-xl">
              N{cart?.tax_total.toLocaleString()}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-xl text-gray">Total</span>
            <span className="font-medium text-xl">
              N{cart?.total.toLocaleString() ?? 0}
            </span>
          </li>
        </ul>
      ) : status === "pending" ? (
        <Loader type="lg" />
      ) : (
        <div></div>
      )}
      <div className="mt-16">
        <ButtonPrimary onClick={handleClick}>Pay with Paystack</ButtonPrimary>
      </div>
    </div>
  );
};

export default PaymentForm;
