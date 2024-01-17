import axios from "../../api/axios";
import DecreaseQuantityButton from "./DecreaseQuantityButton";
import DeleteButton from "./DeleteButton";
import IncreaseQuantityButton from "./IncreaseQuantityButton";

const CartProductCard = ({ product }) => {
  console.log(product);
  return (
    <div className="p-8 text-dark border-b border-gray flex gap-8">
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
          <span className="text-2xl text-gray">{product.title}</span>
          <span className="text-2xl font-medium">
            N{(product.subtotal / 100).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <IncreaseQuantityButton
            quantity={product.quantity}
            lineItemId={product.id}
          />
          <span className="text-xl">{product.quantity}</span>
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
