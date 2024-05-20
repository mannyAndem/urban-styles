import { useDispatch, useSelector } from "react-redux";
import plusIcon from "../../assets/icons/plus-icon.svg";
import plusIconLight from "../../assets/icons/plus-icon-light.svg";
import { selectAddedVariants, updateAddedVariants } from "./cartSlice";
import ButtonPrimary from "../../components/ButtonPrimary";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useMemo } from "react";
import ButtonSecondary from "../../components/ButtonSecondary";
import { useAddLineItemMutation } from "../api/apiSlice";

const AddToCartButton = ({ variantId, type }) => {
  const addedVariants = useSelector(selectAddedVariants);
  const dispatch = useDispatch();

  const isInCart = useMemo(
    () => addedVariants.indexOf(variantId) !== -1,
    [addedVariants]
  );

  const [addToCart, { isSuccess, isError, isLoading, error, data }] =
    useAddLineItemMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateAddedVariants(variantId));
      toast.success("Product added to cart");
    }
    if (isError) {
      console.error(error);
    }
  }, [isSuccess, isError]);

  const handleClick = () => {
    if (!variantId) {
      toast.error("Product variant does not exist");
    } else {
      addToCart(variantId);
    }
  };

  if (type === "icon") {
    return (
      <>
        <Toaster />
        <div>
          <ButtonSecondary
            onClick={handleClick}
            pending={isLoading}
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
        <ButtonPrimary onClick={handleClick} pending={isLoading}>
          ADD TO CART
        </ButtonPrimary>
      ) : (
        <ButtonPrimary disabled>ADDED</ButtonPrimary>
      )}
    </>
  );
};

export default AddToCartButton;
