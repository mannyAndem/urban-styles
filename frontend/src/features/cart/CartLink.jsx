import { Link } from "react-router-dom";
import cartIcon from "../../assets/icons/cartIcon.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, selectCartQuantity, selectCartStatus } from "./cartSlice";
import { useGetCartQuery } from "../api/apiSlice";

const CartLink = () => {
  const { isSuccess, isError, isLoading, data: cart } = useGetCartQuery();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <Link to="/cart" className="flex items-center gap-2">
      <img src={cartIcon} />
      <span>({cart?.items?.length ?? 0})</span>
    </Link>
  );
};

export default CartLink;
