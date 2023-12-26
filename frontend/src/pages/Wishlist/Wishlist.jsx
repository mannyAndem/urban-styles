import ProductList from "../../features/products/ProductList";
import Footer from "../../shared/Footer";
import Header from "../../shared/Header";
import Subscribe from "../../shared/Subscribe";

const Wishlist = () => {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};

export default Wishlist;
