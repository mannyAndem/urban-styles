import { useDispatch, useSelector } from "react-redux";
import plusIcon from "../../assets/icons/plus-icon.svg";
import plusIconLight from "../../assets/icons/plus-icon-light.svg";
import {
  addProductToCart,
  resetAddProductStatus,
  selectAddProductStatus,
  selectAddedVariants,
} from "./cartSlice";
import ButtonPrimary from "../../components/ButtonPrimary";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";
import ButtonSecondary from "../../components/ButtonSecondary";

/**
 *
 * Takes a variantId and type prop.
 * The type prop specifies which type of button to be rendered. It accepts on of two values: "icon" | "regular"
 *  The variantId specifies the id of the variant that a line item will ultimately be generated for in the cart
 */
const AddToCartButton = ({ variantId, type }) => {
  const status = useSelector(selectAddProductStatus);
  const addedVariants = useSelector(selectAddedVariants);
  const dispatch = useDispatch();

  // boolean to hold whether product is already in cart or not
  const isInCart = addedVariants.indexOf(variantId) !== -1;

  const handleClick = () => {
    if (!variantId) {
      toast.error("Variant is not avaliable");
      return;
    }

    dispatch(addProductToCart(variantId));
  };

  useEffect(() => {
    if (status.info === "success" && status.id === variantId) {
      console.log("yes");
      toast.success("Product added to cart");
      dispatch(resetAddProductStatus());
    }
    if (status.info === "error" && status.id === variantId) {
      toast.error("Failed to add product to cart");
      dispatch(resetAddProductStatus());
    }
  }, [status, dispatch]);

  if (type === "icon") {
    return (
      <>
        <Toaster />
        <div>
          <ButtonSecondary
            onClick={handleClick}
            pending={status.info === "pending" && status.id === variantId}
            disabled={isInCart}
            filled={isInCart}
          >
            {isInCart ? <img src={plusIconLight} /> : <img src={plusIcon} />}
          </ButtonSecondary>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster />
      {!isInCart ? (
        <ButtonPrimary
          onClick={handleClick}
          pending={status.info === "pending" && status.id === variantId}
        >
          ADD TO CART
        </ButtonPrimary>
      ) : (
        <ButtonPrimary disabled>ADDED</ButtonPrimary>
      )}
    </>
  );
};

export default AddToCartButton;
