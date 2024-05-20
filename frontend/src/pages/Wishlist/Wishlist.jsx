import ProductList from "../../features/products/ProductList";
import Footer from "../../structure/Footer";
import Header from "../../structure/Header";
import Subscribe from "../../components/Subscribe";
import { useSelector } from "react-redux";
import { selectWishlist } from "../../features/wishlist/wishlistSlice";

const Wishlist = () => {
  const products = useSelector(selectWishlist);

  return (
    <>
      <div className="text-dark">
        <section className="py-24 px-16">
          <h1 className="text-midXl">Wishlist</h1>

          <div className="mt-24">
            {products.length === 0 ? (
              <span className="my-16 block text-center text-2xl font-medium">
                Wishlist is empty :(
              </span>
            ) : (
              <ProductList products={products} />
            )}
          </div>
        </section>
        <section className="py-24 px-16">
          <Subscribe />
        </section>
      </div>
    </>
  );
};

export default Wishlist;
