import { formatPrice } from "../../utils/formatPrice";
import DecreaseQuantityButton from "./DecreaseQuantityButton";
import DeleteButton from "./DeleteButton";
import IncreaseQuantityButton from "./IncreaseQuantityButton";

const CartProductCard = ({ product }) => {
  return (
    <div className="p-4 text-dark border-b border-gray flex gap-4 lg:p-8 lg:gap-8">
      <DeleteButton lineItemId={product.id} variantId={product.variant_id} />
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
          <span className="text-base text-gray lg:text-2xl">
            {product.title}
          </span>
          <span className="text-base font-medium lg:text-2xl">
            {formatPrice(product.total)}
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center lg:gap-4">
          <IncreaseQuantityButton
            quantity={product.quantity}
            lineItemId={product.id}
          />
          <span className="text-base lg:text-xl">{product.quantity}</span>
          <DecreaseQuantityButton
            lineItemId={product.id}
            quantity={product.quantity}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
