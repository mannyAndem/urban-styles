import { useDispatch, useSelector } from "react-redux";
import CartProductCard from "../../features/cart/CartProductCard";
import {
  selectCart,
  selectCartError,
  selectCartQuantity,
  selectCartStatus,
} from "../../features/cart/cartSlice";
import CartSummary from "./components/CartSummary";
import Input from "../../components/Input";
import ButtonPrimary from "../../components/ButtonPrimary";
import Loader from "../../components/Loader";
import ButtonSecondary from "../../components/ButtonSecondary";
import { Link } from "react-router-dom";

const Cart = () => {
  const status = useSelector(selectCartStatus);
  const cart = useSelector(selectCart);
  const quantity = useSelector(selectCartQuantity);
  const error = useSelector(selectCartError);

  const renderCartItems = () => {
    if (cart.items.length === 0) {
      return (
        <span className="my-16 block text-center text-2xl font-medium">
          Cart is empty :(
        </span>
      );
    }
    const cartItems = cart.items.toSorted((a, b) =>
      a.title > b.title ? 1 : -1
    );
    return cartItems.map((product) => (
      <CartProductCard key={product.id} product={product} />
    ));
  };
  return (
    <div className="py-24 px-5 lg:px-16">
      <h1 className="text-4xl font-medium lg:text-midXl">Cart</h1>
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-between col-span-1">
          <div className=" flex flex-col justify-between w-full">
            {status === "success" ? (
              renderCartItems()
            ) : status === "pending" ? (
              <div className="flex items-center justify-center">
                <Loader type="lg" />
              </div>
            ) : (
              <span className="block text-xl font-medium text-center text-red-400">
                An error occurred
              </span>
            )}
          </div>
          <div className="mt-8 flex gap-8">
            <Input color="#5F5F5F" placeholder="Enter coupon code" />
            <div>
              <ButtonSecondary>Apply Coupon</ButtonSecondary>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-16 justify-between">
          <CartSummary quantity={quantity} cart={cart} />
          <Link to="/checkout">
            <ButtonPrimary>PROCEED TO CHECKOUT</ButtonPrimary>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
