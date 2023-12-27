import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "../../api/axios";
import ProductList from "../../features/products/ProductList";
import { useEffect, useLayoutEffect, useState } from "react";
import ImageGallery from "./components/imageGallery";
import SizeOptions from "./components/SizeOptions";
import ColorOptions from "./components/ColorOptions";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import AddToCartButton from "../../features/cart/AddToCartButton";

const ProductDetails = () => {
  const { id } = useParams();

  const [status, setStatus] = useState("pending");
  const [product, setProduct] = useState(null);

  // state to hold image gallery component visibilty
  const [imageGalleryVisibilty, setImageGalleryVisibilty] = useState(false);

  const toggleImageGallery = () => {
    setImageGalleryVisibilty((prev) => !prev);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        console.log(response.data.product);
        setProduct(response.data.product);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    };

    fetchProduct();
  }, []);

  // function to parse and display product's available sizes
  const parseSizes = () => {
    const sizeOptions = product.options.find(
      (option) => option.title === "Size"
    );
    if (!sizeOptions) {
      return [];
    }
    let sizes = new Set();
    sizeOptions.values.forEach((item) => sizes.add(item.value));
    return Array.from(sizes);
  };

  const parseColors = () => {
    const colorOptions = product.options.find(
      (option) => option.title === "Color"
    );
    if (!colorOptions) {
      return [];
    }
    let colors = new Set();
    colorOptions.values.forEach((item) => colors.add(item.value));
    return Array.from(colors);
  };

  // logic to handle product variant changes
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // const selectedSize = searchParams.get("size");
  // const selectedColor = searchParams.get("color");

  const selectedSize =
    searchParams.get("size") || (status === "success" && parseSizes()[0]);
  const selectedColor =
    searchParams.get("color") || (status === "success" && parseColors()[0]);

  const selectColor = (color) => {
    if (selectedSize) {
      navigate(`?color=${color}&size=${selectedSize}`);
    } else {
      navigate(`?color=${color}`);
    }
  };

  const selectSize = (size) => {
    if (selectedColor) {
      navigate(`?color=${selectedColor}&size=${size}`);
    } else {
      navigate(`?size=${size}`);
    }
  };

  const getCurrentVariantId = () => {
    if (selectedColor && selectedSize) {
      const variantText = `${selectedSize} / ${selectedColor}`;
      const variant = product.variants.find(
        (variant) => variant.title === variantText
      );
      return variant?.id;
    }
    if (selectedSize) {
      const variantText = `${selectedSize}`;
      const variant = product.variants.find(
        (variant) => variant.title === variantText
      );
      return variant?.id;
    }
    if (selectedColor) {
      const variantText = `${selectedColor}`;
      const variant = product.variants.find(
        (variant) => variant.title === variantText
      );
      return variant?.id;
    }
  };
  return (
    <>
      <Header />
      <div className="text-dark">
        <section className="py-24 px-16">
          <h1 className="text-midXl font-medium">Product Details</h1>
          {status === "pending" ? (
            <span className="text-2xl block text-center">Loading...</span>
          ) : status === "error" ? (
            <span className="text-2xl text-center block text-red-300">
              Something went wrong.
            </span>
          ) : (
            <>
              {imageGalleryVisibilty && (
                <ImageGallery
                  images={product.images}
                  toggleImageGallery={toggleImageGallery}
                  imageGalleryVisibility={imageGalleryVisibilty}
                />
              )}
              <div className="mt-24 flex gap-8">
                <div className="w-1/2 grid grid-cols-3 gap-8">
                  <div className="col-span-1 row-span-1 rounded-sm overflow-hidden shadow-sm">
                    <img
                      src={product.thumbnail}
                      className="cursor-pointer w-full h-full object-cover"
                      onClick={toggleImageGallery}
                    />
                  </div>
                  <div className="col-span-2 row-span-2 rounded-sm overflow-hidden shadow-sm">
                    <img
                      src={product.images[0]?.url ?? product.thumbnail}
                      className="cursor-pointer w-full h-full object-cover"
                      onClick={toggleImageGallery}
                    />
                  </div>
                  <div className="col-span-1 row-span-1 rounded-sm overflow-hidden shadow-sm">
                    <img
                      src={product.images[1]?.url ?? product.thumbnail}
                      className="cursor-pointer w-full h-full object-cover"
                      onClick={toggleImageGallery}
                    />
                  </div>
                </div>
                <div className="w-1/2 flex flex-col justify-between gap-16">
                  <div className="flex flex-col gap-8">
                    <h2 className="text-2xl font-medium">{product.title}</h2>
                    <p>{product.description}</p>
                    <span className="text-2xl font-medium">
                      ${product.variants[0].prices[0].amount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    {selectedColor && (
                      <ColorOptions
                        colors={parseColors()}
                        selectedColor={selectedColor}
                        selectColor={selectColor}
                      />
                    )}
                    {selectedSize && (
                      <SizeOptions
                        sizes={parseSizes()}
                        selectedSize={selectedSize}
                        selectSize={selectSize}
                      />
                    )}
                  </div>
                  <div className="flex gap-8 ">
                    <button className="rounded-md w-full p-4 border-2 border-dark">
                      ADD TO WISHLIST
                    </button>
                    <AddToCartButton
                      variantId={getCurrentVariantId()}
                      type="regular"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
        <section className="py-24 px-16">
          <div className="mx-auto w-max py-2 px-8 bg-dark text-lightPink border-dark border rounded-sm">
            <h2>RELATED PRODUCTS</h2>
          </div>
          <div className="mt-24">{/* <ProductList /> */}</div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
