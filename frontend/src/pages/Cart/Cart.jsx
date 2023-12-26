import { useDispatch, useSelector } from "react-redux";
import CartProductCard from "../../features/cart/CartProductCard";
import Footer from "../../shared/Footer";
import Header from "../../shared/Header";
import {
  fetchCart,
  selectCart,
  selectCartError,
  selectCartStatus,
} from "../../features/cart/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const status = useSelector(selectCartStatus);
  const cart = useSelector(selectCart);
  const error = useSelector(selectCartError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCart());
    }
  }, [status, dispatch]);

  return (
    <>
      <Header />
      <div className="py-24 px-16">
        <h1 className="text-midXl font-medium">Cart</h1>
        <div className="mt-16 flex gap-8">
          <div>
            <div className="flex flex-col w-full">
              {status === "success" ? (
                cart.items.map((product) => (
                  <CartProductCard product={product} />
                ))
              ) : status === "pending" ? (
                <span className="block text-center text-xl font-medium">
                  Loading...
                </span>
              ) : (
                <span className="block text-xl font-medium text-center text-red-400">
                  An error occurred
                </span>
              )}
            </div>
            <div className="mt-8 flex gap-8">
              <input
                className="bg-transparent w-full text-xl px-4 py-3 rounded-sm border border-gray"
                placeholder="Enter coupon code"
              />
              <button className="whitespace-nowrap px-8 py-4 bg-dark text-lightPink rounded-sm text-xl">
                Apply Coupon
              </button>
            </div>
          </div>
          <div className="text-dark  w-1/3">
            <h2 className="text-2xl font-medium">Order Summary</h2>
            <ul className="mt-8 flex flex-col gap-8">
              <li className="flex items-center justify-between">
                <span className="text-xl text-gray">Cart Item</span>
                <span className="font-medium text-xl">3</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xl text-gray">Subtotal</span>
                <span className="font-medium text-xl">N120,000</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xl text-gray">Delivery</span>
                <span className="font-medium text-xl">N2000</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xl text-gray">Total</span>
                <span className="font-medium text-xl">N122,000</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
