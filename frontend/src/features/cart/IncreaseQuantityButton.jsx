import { useDispatch } from "react-redux";
import { updateItem } from "./cartSlice";
import plusIcon from "../../assets/icons/plus-icon.svg";

const IncreaseQuantityButton = ({ lineItemId, quantity }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    const data = {
      id: lineItemId,
      quantity: quantity + 1,
    };
    dispatch(updateItem(data));
  };

  return (
    <button onClick={handleClick} className="p-3 border border-dark rounded-sm">
      <img src={plusIcon} className="w-4" />
    </button>
  );
};

export default IncreaseQuantityButton;
