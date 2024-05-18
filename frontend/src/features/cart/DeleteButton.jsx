import { useDispatch } from "react-redux";
import deleteIcon from "../../assets/icons/delete.svg";
import { deleteVariant } from "./cartSlice";
import { useDeleteLineItemMutation } from "../api/apiSlice";
import Loader from "../../components/Loader";

const DeleteButton = ({ lineItemId, variantId }) => {
  const [deleteItem, { isSuccess, isLoading }] = useDeleteLineItemMutation();
  const dispatch = useDispatch();

  const handleClick = () => {
    deleteItem(lineItemId);
    dispatch(deleteVariant(variantId));
  };

  return (
    <button onClick={handleClick} className="flex items-center justify-center">
      {isLoading ? <Loader type="xs" /> : <img src={deleteIcon} alt="" />}
    </button>
  );
};

export default DeleteButton;
