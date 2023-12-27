import { useDispatch, useSelector } from "react-redux";
import CartProductCard from "../../features/cart/CartProductCard";
import Footer from "../../shared/Footer";
import Header from "../../shared/Header";
import {
  fetchCart,
  selectCart,
  selectCartError,
  selectCartQuantity,
  selectCartStatus,
} from "../../features/cart/cartSlice";
import { useEffect } from "react";
import CartSummary from "./components/CartSummary";
import Input from "../../components/Input";
import ButtonPrimary from "../../components/ButtonPrimary";

const Cart = () => {
  const status = useSelector(selectCartStatus);
  const cart = useSelector(selectCart);
  const quantity = useSelector(selectCartQuantity);
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
                  <CartProductCard key={product.id} product={product} />
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
              <Input placeholder="Enter coupon code" />
              <div>
                <ButtonPrimary>Apply Coupon</ButtonPrimary>
              </div>
            </div>
          </div>
          <CartSummary quantity={quantity} cart={cart} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
