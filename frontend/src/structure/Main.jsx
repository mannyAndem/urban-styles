import Footer from "./Footer";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Wishlist from "../pages/Wishlist/Wishlist";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Contact from "../pages/Contact/Contact";
import ScrollToTop from "../components/ScrollToTop";
import About from "../pages/About/About";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import Checkout from "../pages/Checkout/Checkout";
import OrderComplete from "../pages/CompleteCart/CompleteCart";

// Component wrapper to wrap all the components within a header and footer
const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/wishlist" element={<Wishlist />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/products/:handle"
          element={
            <ScrollToTop>
              <ProductDetails />
            </ScrollToTop>
          }
        />
        <Route
          path="/complete"
          element={
            <ScrollToTop>
              <OrderComplete />
            </ScrollToTop>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Main;
