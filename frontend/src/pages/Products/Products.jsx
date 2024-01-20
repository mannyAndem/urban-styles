import ProductList from "../../features/products/ProductList";
import arrow from "../../assets/icons/arrow-down-icon.png";
import arrowWhite from "../../assets/icons/arrow-right-white.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  resetProductsStatus,
  selectMeta,
  selectProducts,
  selectProductsStatus,
} from "../../features/products/productsSlice";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import Loader from "../../components/Loader";

const Products = () => {
  const status = useSelector(selectProductsStatus);
  const products = useSelector(selectProducts);
  const meta = useSelector(selectMeta);
  const dispatch = useDispatch();

  // pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const numberOfPages = Math.ceil(meta?.count / meta?.limit);
  const navigate = useNavigate();
  const navigateToPage = (page) => {
    dispatch(resetProductsStatus());
    navigate(`?page=${page}`);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts(page));
    }
  }, [status, dispatch]);

  console.log(products);
  return (
    <ScrollToTop>
      <div className="text-dark">
        <section className="py-24 px-5 lg:px-16">
          <div className="flex justify-between items-center text-dark">
            <h2 className="text-4xl font-medium lg:text-midXl">All Products</h2>

            <button className="lg:text-xl flex items-center gap-2 px-4 py-3 border border-dark rounded-sm">
              <span>Sort By</span>
              <img src={arrow} alt="" />
            </button>
          </div>

          <div className="my-24">
            {status === "success" ? (
              <ProductList products={products} />
            ) : status === "pending" ? (
              <div className="flex items-center justify-center">
                <Loader type="lg" />
              </div>
            ) : (
              <span className="block text-red-400 text-center text-2xl">
                Something went wrong.
              </span>
            )}
          </div>
          <div className="mx-auto full flex items-center justify-between lg:w-1/2">
            <button
              disabled={page == 1}
              onClick={() => navigateToPage(page - 1)}
              className="font-medium flex items-center gap-2 px-3 py-4 border border-dark rounded-sm"
            >
              <img src={arrow} alt="" className="transform rotate-90" />
              <span>Previous</span>
            </button>
            <div className="font-medium flex items-center gap-3 lg:gap-6">
              {status === "success" ? (
                <>
                  <span className="px-4 py-2 border border-gray">{page}</span>
                  <span>of</span>
                  <span>{numberOfPages}</span>
                </>
              ) : status === "pending" ? (
                <span className="block text-center">Loading...</span>
              ) : (
                <></>
              )}
            </div>
            <button
              disabled={page == numberOfPages}
              onClick={() => navigateToPage(page + 1)}
              className="font-medium flex items-center gap-2 px-3 py-4 border bg-dark text-lightPink border-dark rounded-sm"
            >
              <span>Next</span>
              <img src={arrowWhite} />
            </button>
          </div>
        </section>
      </div>
    </ScrollToTop>
  );
};

export default Products;
