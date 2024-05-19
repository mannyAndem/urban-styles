import minusIcon from "../../assets/icons/minus-icon.svg";
import Loader from "../../components/Loader";
import { useUpdateLineItemMutation } from "../api/apiSlice";

const DecreaseQuantityButton = ({ lineItemId, quantity }) => {
  const [update, { isSuccess, isError, isLoading }] =
    useUpdateLineItemMutation();

  const handleClick = () => {
    const data = {
      id: lineItemId,
      quantity: quantity - 1,
    };

    update(data);
  };

  return (
    <button
      disabled={quantity === 1 || isLoading}
      onClick={handleClick}
      className="p-2 border border-dark rounded-sm disabled:cursor-not-allowed lg:p-3"
    >
      {isLoading ? (
        <Loader type="xs" />
      ) : (
        <img src={minusIcon} className="w-4" />
      )}
    </button>
  );
};

export default DecreaseQuantityButton;
