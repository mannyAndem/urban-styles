import heartIcon from "../../assets/icons/heart-icon.svg";
import { Link } from "react-router-dom";
import AddToCartButton from "../cart/AddToCartButton";
import { formatPrice } from "../../utils/formatPrice";
import rightArrowImg from "../../assets/icons/arrow-right-white.svg";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full relative flex flex-col gap-3 rounded-sm ">
      <button className="absolute top-8 right-8 p-2 border-2 border-dark rounded-md">
        <img src={heartIcon} />
      </button>
      <Link
        to={`/products/${product.handle}`}
        className="w-full rounded-sm overflow-hidden relative group"
      >
        <div className="opacity-0 flex items-center justify-center absolute h-full w-full bg-dark bg-opacity-40 backdrop-blur-sm group-hover:opacity-100 transition-all duration-300 ease-out">
          <span className="text-medium text-lightPink text-xl text-center flex items-center gap-2 group-hover:gap-4 transition-all duration-300 delay-200 ease-out">
            View details
            <img src={rightArrowImg} className="w-5 h-5" />
          </span>
        </div>
        <img src={product.thumbnail} className="w-full object-cover" />
      </Link>
      <div className="flex items-center justify-between ">
        <div className="flex flex-col gap-2">
          <span className="lg:text-xl text-gray">{product.title}</span>
          <span className="text-dark font-medium text-xl lg:text-2xl">
            {formatPrice(product.variants[0].calculated_price_incl_tax)}
          </span>
        </div>
        <AddToCartButton type="icon" variantId={product.variants[0].id} />
      </div>
    </div>
  );
};

export default ProductCard;
