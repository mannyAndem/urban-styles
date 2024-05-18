import { formatPrice } from "../../../utils/formatPrice";

const CartSummary = ({ cart }) => {
  return (
    <div className="text-dark w-full ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Order Summary</h2>
        <span className="font-medium">(Shipping fees not included)</span>
      </div>
      <ul className="mt-8 flex flex-col gap-8">
        <li className="flex items-center justify-between">
          <span className="text-xl text-gray">Cart Items</span>
          <span className="font-medium text-xl">
            {cart.items.reduce((acc, curr) => acc + curr.quantity, 0)}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-xl text-gray">Subtotal</span>
          <span className="font-medium text-xl">
            {formatPrice(cart.subtotal)}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-xl text-gray">Taxes</span>
          <span className="font-medium text-xl">
            {formatPrice(cart.tax_total)}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-xl text-gray">Total</span>
          <span className="font-medium text-xl">{formatPrice(cart.total)}</span>
        </li>
      </ul>
    </div>
  );
};

export default CartSummary;
