import { Link } from "react-router-dom";
import cartIcon from "../../assets/icons/cartIcon.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, selectCartQuantity, selectCartStatus } from "./cartSlice";

const CartLink = () => {
  const quantity = useSelector(selectCartQuantity);
  const status = useSelector(selectCartStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCart());
    }
  }, [dispatch, status]);

  return (
    <Link to="/cart" className="flex items-center gap-2">
      <img src={cartIcon} />
      <span>({quantity})</span>
    </Link>
  );
};

export default CartLink;
