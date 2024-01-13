import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeCart,
  selectCart,
  selectCompleteCartError,
  selectCompleteCartStatus,
} from "../../features/cart/cartSlice";

const CompleteCart = () => {
  const status = useSelector(selectCompleteCartStatus);
  const error = useSelector(selectCompleteCartError);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(completeCart());
  }, []);

  useEffect(() => {
    if (status === "success") {
      console.log(cart);
    }
    if (status === "error") {
      console.error(error);
    }
  }, [status]);
  return <div></div>;
};

export default CompleteCart;