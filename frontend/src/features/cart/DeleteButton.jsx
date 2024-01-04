import { useDispatch } from "react-redux";
import deleteIcon from "../../assets/icons/delete.svg";
import { deleteItem } from "./cartSlice";

const DeleteButton = ({ lineItemId, variantId }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteItem({ lineItemId, variantId }));
  };

  return (
    <button onClick={handleClick} className="flex items-center justify-center">
      <img src={deleteIcon} alt="" />
    </button>
  );
};

export default DeleteButton;
