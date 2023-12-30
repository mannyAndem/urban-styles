import { useDispatch, useSelector } from "react-redux";
import plusIcon from "../../assets/icons/plus-icon.svg";
import {
  addProductToCart,
  resetAddProductStatus,
  selectAddProductStatus,
} from "./cartSlice";
import ButtonPrimary from "../../components/ButtonPrimary";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";

/**
 *
 * Takes a variantId and type prop.
 * The type prop specifies which type of button to be rendered. It accepts on of two values: "icon" | "regular"
 *  The variantId specifies the id of the variant that a line item will ultimately be generated for in the cart
 */
const AddToCartButton = ({ variantId, type }) => {
  const status = useSelector(selectAddProductStatus);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!variantId) {
      toast.error("Variant is not avaliable");
      return;
    }

    dispatch(addProductToCart(variantId));
  };

  useEffect(() => {
    if (status.status === "success" && status.id === variantId) {
      console.log("yes");
      toast.success("Product added to cart");
      dispatch(resetAddProductStatus());
    }
    if (status.status === "error" && status.id === variantId) {
      toast.error("Failed to add product to cart");
      dispatch(resetAddProductStatus());
    }
  }, [status, dispatch]);

  if (type === "icon") {
    return (
      <>
        <Toaster />
        <button
          disabled={status === "pending"}
          onClick={handleClick}
          className="p-3 border-2 border-dark rounded-md"
        >
          <img src={plusIcon} />
        </button>
      </>
    );
  }

  return (
    <>
      <Toaster />
      <ButtonPrimary onClick={handleClick} pending={status === "pending"}>
        ADD TO CART
      </ButtonPrimary>
    </>
  );
};

export default AddToCartButton;
