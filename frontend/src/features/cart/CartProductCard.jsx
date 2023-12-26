import deleteIcon from "../../assets/icons/delete.svg";
import productImg from "../../assets/images/blue-tshirt.png";
import plusIcon from "../../assets/icons/plus-icon.svg";
import minusIcon from "../../assets/icons/minus-icon.svg";

const CartProductCard = ({ product }) => {
  return (
    <div className="p-8 text-dark border-b border-gray flex gap-8">
      <button className="flex items-center justify-center">
        <img src={deleteIcon} alt="" />
      </button>
      <div>
        <img
          src={product.thumbnail}
          className="object-cover"
          width={192}
          height={192}
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-8 justify-center">
          <span className="text-2xl text-gray">{product.title}</span>
          <span className="text-2xl font-medium">${product.total}</span>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="p-3 border border-dark rounded-sm">
            <img src={plusIcon} className="w-4" />
          </div>
          <span className="text-xl">{product.quantity}</span>
          <div className="p-3 border border-dark rounded-sm">
            <img src={minusIcon} className="w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
