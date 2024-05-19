import CartProductCard from "../../features/cart/CartProductCard";
import CartSummary from "./components/CartSummary";
import ButtonPrimary from "../../components/ButtonPrimary";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import {
  useGetCartQuery,
  useUpdateCartMutation,
} from "../../features/api/apiSlice";
import LoginModal from "./components/LoginModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../features/customer/customerSlice";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState();
  const currentUser = useSelector(selectCustomer);
  const navigate = useNavigate();

  const {
    isSuccess,
    isError,
    data: cart,
    isLoading,
    error,
  } = useGetCartQuery();

  const [
    updateCart,
    {
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      isLoading: isUpdateLoading,
      error: updateError,
      data: updatedCart,
    },
  ] = useUpdateCartMutation();

  const handleCheckoutClick = () => {
    if (currentUser) {
      console.log(currentUser);

      updateCart({ customer_id: currentUser.id });
    } else {
      setIsLoginModalOpen(true);
    }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      console.log("success");
      console.log(updatedCart);
      navigate("/checkout");
    }
    if (isUpdateError) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }, [isUpdateSuccess, isUpdateError]);

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
      <Toaster />
      <LoginModal
        isOpen={isLoginModalOpen}
        close={() => setIsLoginModalOpen(false)}
      />
      <h1 className="text-4xl font-medium lg:text-midXl">Cart</h1>
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-between col-span-1">
          <div className=" flex flex-col justify-between w-full">
            {isSuccess ? (
              renderCartItems()
            ) : isLoading ? (
              <div className="flex items-center justify-center">
                <Loader type="lg" />
              </div>
            ) : (
              <span className="block text-xl font-medium text-center text-red-400">
                An error occurred
              </span>
            )}
          </div>
          {/* <div className="mt-8 flex gap-8">
            <Input color="#5F5F5F" placeholder="Enter coupon code" />
            <div>
              <ButtonSecondary>Apply Coupon</ButtonSecondary>
            </div>
          </div> */}
        </div>
        <div className="col-span-1 flex flex-col gap-16 justify-between">
          {isSuccess && <CartSummary cart={cart} />}
          <ButtonPrimary
            onClick={handleCheckoutClick}
            pending={isUpdateLoading}
          >
            PROCEED TO CHECKOUT
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default Cart;
