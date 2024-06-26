import { Link } from "react-router-dom";
import hero1 from "../../assets/images/hero-1.png";
import hero2 from "../../assets/images/hero-2.png";
import hero3 from "../../assets/images/hero-3.png";
import imgAbout from "../../assets/images/img-about.png";
import arrowRight from "../../assets/icons/arrow-right.svg";
import arrowRightWhite from "../../assets/icons/arrow-right-white.svg";
import ProductList from "../../features/products/ProductList";
import becomeAffiliate from "../../assets/images/become-affiliate.png";
import Subscribe from "../../components/Subscribe";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Home = () => {
  const { data, isLoading, isError, isSuccess, error } = useGetProductsQuery(1);

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [isError]);

  return (
    <main>
      <section className="px-5 py-24 lg:px-16">
        <h1 className="text-8xl font-medium text-center text-dark lg:text-superXl ">
          URBAN STYLES
        </h1>
        <div className="mt-16 flex items-center gap-8 justify-center">
          <img
            src={hero2}
            alt="Man wearing cool tshirt"
            className="w-full hidden lg:block"
          />
          <img src={hero1} alt="Man wearing cool hoodie" className="w-full" />
          <img
            src={hero3}
            alt="Man wearing cool tshirt"
            className="w-full hidden lg:block"
          />
        </div>
      </section>
      <section className="py-24 px-5 flex justify-end lg:px-16">
        <div className="text-dark w-full flex flex-col gap-8 lg:w-2/3">
          <h2 className="text-4xl lg:text-midXl font-medium">About</h2>
          <p className="lg:text-2xl font-light">
            At Urban Styles, we're not just a fashion destination; we're a
            cultural movement. We understand that clothing isn't just something
            you wear; it's a statement, a reflection of your identity and the
            vibrant urban world you inhabit...
          </p>
          <Link
            to="/about"
            className="flex items-center gap-3 lg:text-xl font-medium"
          >
            <span>SEE MORE</span>
            <img src={arrowRight} alt="Right arrow" />
          </Link>
        </div>
      </section>
      <section className="py-24 px-5 lg:px-16">
        <img
          src={imgAbout}
          className="w-full object-cover"
          alt="Image of male wearing the same gray tshirt in two different poses"
        />
      </section>
      <section className="py-24 px-5 lg:px-16">
        <div className="flex justify-between items-end text-dark">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-medium lg:text-midXl">New Releases</h2>
            <span className="lg:text-xl">All Items Available For Purchase</span>
          </div>
          <Link to="/products" className="lg:text-xl">
            SEE ALL
          </Link>
        </div>
        <div className="mt-16">
          {isSuccess ? (
            <ProductList products={data.products.slice(0, 3)} />
          ) : isLoading ? (
            <div className="flex items-center justify-center">
              <Loader type="lg" />
            </div>
          ) : (
            <span className="block text-red-400 text-center text-2xl">
              Something went wrong.
            </span>
          )}
        </div>
      </section>
      <section className="py-24 px-5 lg:px-16 ">
        <div
          style={{ "--image-url": `url(${becomeAffiliate})` }}
          className="p-16 bg-[image:var(--image-url)] flex justify-center"
        >
          <div className="w-full text-white text-center lg:w-2/3">
            <h2 className="text-4xl font-500 mb-2 lg:text-midXl lg:leading-[5rem]">
              Own a Store?
              <br />
              Become Our Affiliate
            </h2>
            <p className="lg:text-xl font-light">
              Become a part of the chorus and unlock exciting opportunities for
              mutual growth and success.
            </p>
            <Link
              to="/contact"
              className="mx-auto mt-16 flex justify-center w-max items-center gap-4 text-white p-4 border border-white rounded-sm"
            >
              <span className="lg:text-xl font-medium">Contact Sales</span>
              <img src={arrowRightWhite} alt="" />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-24 px-5 lg:px-16">
        <div className="flex justify-between items-end text-dark">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-medium lg:text-midXl">All Products</h2>
            <span className="lg:text-xl">All Items Available For Purchase</span>
          </div>
          <Link to="/products" className="lg:text-xl">
            SEE ALL
          </Link>
        </div>
        <div className="mt-16">
          {isSuccess ? (
            <ProductList products={data.products.slice(0, 6)} />
          ) : isLoading ? (
            <div className="flex items-center justify-center">
              <Loader type="lg" />
            </div>
          ) : (
            <span className="block text-red-400 text-center text-2xl">
              Something went wrong.
            </span>
          )}
        </div>
      </section>
      <section className="py-24 px-5 lg:px-16">
        <Subscribe />
      </section>
    </main>
  );
};

export default Home;
