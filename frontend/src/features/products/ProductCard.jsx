import heartIcon from "../../assets/icons/heart-icon.svg";
import { Link } from "react-router-dom";
import AddToCartButton from "../cart/AddToCartButton";
import { parsePriceInNgn } from "../../utils/parsePriceInNgn";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full relative flex flex-col gap-3 rounded-sm ">
      <button className="absolute top-8 right-8 p-2 border-2 border-dark rounded-md">
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
          <span className="lg:text-xl text-gray">{product.title}</span>
          <span className="text-dark font-medium text-xl lg:text-2xl">
            {parsePriceInNgn(product.variants[0])}
          </span>
        </div>
        <AddToCartButton type="icon" variantId={product.variants[0].id} />
      </div>
    </div>
  );
};

export default ProductCard;
