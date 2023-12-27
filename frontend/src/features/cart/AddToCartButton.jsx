import { useDispatch, useSelector } from "react-redux";
import plusIcon from "../../assets/icons/plus-icon.svg";
import { addProductToCart, selectAddProductStatus } from "./cartSlice";
import ButtonPrimary from "../../components/ButtonPrimary";

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
    if (variantId) {
      dispatch(addProductToCart(variantId));
    }

    // HANDLE CASE WHERE VARIANTID DOES NOT EXIST!!
  };

  if (type === "icon") {
    return (
      <button
        onClick={handleClick}
        className="p-3 border-2 border-dark rounded-md"
      >
        <img src={plusIcon} />
      </button>
    );
  }

  return (
    <ButtonPrimary onClick={handleClick} pending={status === "pending"}>
      ADD TO CART
    </ButtonPrimary>
  );
};

export default AddToCartButton;
