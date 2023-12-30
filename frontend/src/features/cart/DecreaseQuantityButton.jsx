import { useDispatch } from "react-redux";
import { updateItem } from "./cartSlice";
import minusIcon from "../../assets/icons/minus-icon.svg";

const DecreaseQuantityButton = ({ lineItemId, quantity }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    const data = {
      id: lineItemId,
      quantity: quantity - 1,
    };
    dispatch(updateItem(data));
  };

  return (
    <button
      disabled={quantity === 1}
      onClick={handleClick}
      className="p-3 border border-dark rounded-sm"
    >
      <img src={minusIcon} className="w-4" />
    </button>
  );
};

export default DecreaseQuantityButton;
