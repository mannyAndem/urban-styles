import heartIcon from "../../assets/icons/heart-icon.svg";
import { Link } from "react-router-dom";
import AddToCartButton from "../cart/AddToCartButton";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full relative flex flex-col gap-3 rounded-sm ">
      <button className="absolute top-8 right-8 p-2 border border-dark rounded-sm">
        <img src={heartIcon} />
      </button>
      <Link
        to={`/products/${product.id}`}
        className="w-full rounded-sm overflow-hidden"
      >
        <img src={product.thumbnail} className="w-full object-cover" />
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xl text-gray">{product.title}</span>
          <span className="text-dark font-medium text-2xl">
            ${product.variants[0].prices[0].amount}
          </span>
        </div>
        <AddToCartButton variantId={product.variants[0].id} />
      </div>
    </div>
  );
};

export default ProductCard;
