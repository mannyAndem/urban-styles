import ProductList from "../../features/products/ProductList";
import Footer from "../../structure/Footer";
import Header from "../../structure/Header";
import Subscribe from "../../components/Subscribe";

const Wishlist = () => {
  return (
    <>
      <div className="text-dark">
        <section className="py-24 px-16">
          <h1 className="text-midXl">Wishlist</h1>

          <div className="mt-24">
            <ProductList products={[]} />
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
