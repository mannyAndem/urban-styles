import { Link } from "react-router-dom";
import cartIcon from "../../assets/icons/cartIcon.png";
import { useEffect } from "react";
import { useGetCartQuery } from "../api/apiSlice";

const CartLink = () => {
  const { isSuccess, isError, isLoading, data: cart } = useGetCartQuery();

  return (
    <Link to="/cart" className="flex items-center gap-2">
      <img src={cartIcon} />
      <span>
        ({cart?.items.reduce((acc, curr) => acc + curr.quantity, 0) ?? 0})
      </span>
    </Link>
  );
};

export default CartLink;
