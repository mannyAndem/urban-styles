import { Link } from "react-router-dom";
import arrowRight from "../../assets/icons/arrow-right-white.svg";

const OrderComplete = () => {
  return (
    <div className="text-lightPink py-24 flex justify-center items-center">
      <div className="bg-dark border-2 border-dark rounded-md p-16 max-w-[600px] shadow-md flex flex-col gap-4">
        <h1 className="text-midXl mb-8">Order Successful!</h1>
        <p className="text-2xl">
          Your order was successfully placed and will be shipped between 3 to 5
          business days.
        </p>
        <p className="text-2xl">Thank you for shopping at Urban Styles!</p>
        <Link
          to="/"
          className="mt-8 flex items-center gap-3 lg:text-xl font-medium"
        >
          <span>BACK TO HOME</span>
          <img src={arrowRight} alt="Right arrow" />
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete;
