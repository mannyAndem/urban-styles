import { useDispatch, useSelector } from "react-redux";
import plusIcon from "../../assets/icons/plus-icon.svg";
import { addProductToCart, selectAddProductStatus } from "./cartSlice";

const AddToCartButton = ({ variantId }) => {
  const status = useSelector(selectAddProductStatus);
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log(variantId);
    dispatch(addProductToCart(variantId));
    console.log("Product added (Insha Allah)");
  };

  return (
    <button onClick={handleClick} className="p-3 border border-dark rounded-sm">
      <img src={plusIcon} />
    </button>
  );
};

export default AddToCartButton;
