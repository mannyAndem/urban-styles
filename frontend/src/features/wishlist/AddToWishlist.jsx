import { useDispatch, useSelector } from "react-redux";
import heartIcon from "../../assets/icons/heart-icon.svg";
import heartIconFilled from "../../assets/icons/heart-icon-filled.svg";
import {
  addToWishlist,
  deleteFromWishlist,
  selectWishlist,
} from "./wishlistSlice";
import { useMemo } from "react";

const AddToWishlist = ({ product, type }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);

  const isInWishlist = useMemo(() => {
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i].id === product.id) {
        return true;
      }
    }
    return false;
  }, [wishlist]);

  const handleClick = () => {
    if (isInWishlist) {
      dispatch(deleteFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  console.log(isInWishlist);

  if (type === "icon") {
    return (
      <button
        onClick={handleClick}
        className="absolute top-8 right-8 z-10 p-2 border-2 border-dark rounded-md"
      >
        {isInWishlist ? <img src={heartIconFilled} /> : <img src={heartIcon} />}
      </button>
    );
  } else {
    return (
      <button
        onClick={handleClick}
        className="rounded-md w-full p-4 border-2 border-dark"
      >
        {isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
      </button>
    );
  }
};

export default AddToWishlist;
