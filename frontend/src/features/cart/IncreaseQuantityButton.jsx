import plusIcon from "../../assets/icons/plus-icon.svg";
import Loader from "../../components/Loader";
import { useUpdateLineItemMutation } from "../api/apiSlice";

const IncreaseQuantityButton = ({ lineItemId, quantity }) => {
  const [update, { isSuccess, isError, isLoading }] =
    useUpdateLineItemMutation();

  const handleClick = () => {
    const data = {
      id: lineItemId,
      quantity: quantity + 1,
    };
    update(data);
  };

  return (
    <button
      onClick={handleClick}
      className="p-3 border border-dark rounded-sm disabled:cursor-not-allowed"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader type="xs" />
      ) : (
        <img src={plusIcon} className="w-4" />
      )}
    </button>
  );
};

export default IncreaseQuantityButton;
