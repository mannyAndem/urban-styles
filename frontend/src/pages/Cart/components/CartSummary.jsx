const CartSummary = ({ cart, quantity }) => {
  return (
    <div className="text-dark w-full ">
      <h2 className="text-2xl font-medium">Order Summary</h2>
      <ul className="mt-8 flex flex-col gap-8">
        <li className="flex items-center justify-between">
          <span className="text-xl text-gray">Cart Item</span>
          <span className="font-medium text-xl">{quantity ?? 0}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-xl text-gray">Subtotal</span>
          <span className="font-medium text-xl">${cart?.subtotal ?? 0}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-xl text-gray">Delivery</span>
          <span className="font-medium text-xl">
            ${cart?.shipping_total ?? 0}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-xl text-gray">Total</span>
          <span className="font-medium text-xl">${cart?.total ?? 0}</span>
        </li>
      </ul>
    </div>
  );
};

export default CartSummary;
