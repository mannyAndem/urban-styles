import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import ImageGallery from "./components/imageGallery";
import SizeOptions from "./components/SizeOptions";
import ColorOptions from "./components/ColorOptions";
import AddToCartButton from "../../features/cart/AddToCartButton";
import Loader from "../../components/Loader";
import { useGetProductQuery } from "../../features/api/apiSlice";
import { formatPrice } from "../../utils/formatPrice";

const ProductDetails = () => {
  const { handle } = useParams();

  const {
    isSuccess,
    isLoading,
    data: product,
    isError,
    error,
  } = useGetProductQuery(handle);

  useEffect(() => {
    if (isSuccess) {
      console.log(product);
    }
  }, [isSuccess]);

  // state to hold image gallery component visibilty
  const [imageGalleryVisibilty, setImageGalleryVisibilty] = useState(false);

  const toggleImageGallery = () => {
    setImageGalleryVisibilty((prev) => !prev);
  };

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
    searchParams.get("size") || (isSuccess && parseSizes()[0]);
  const selectedColor =
    searchParams.get("color") || (isSuccess && parseColors()[0]);

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

  const getCurrentVariant = () => {
    if (selectedColor && selectedSize) {
      const variantText = `${selectedSize} / ${selectedColor}`;
      const variant = product.variants.find(
        (variant) => variant.title === variantText
      );
      return variant;
    }
    if (selectedSize) {
      const variantText = `${selectedSize}`;
      const variant = product.variants.find(
        (variant) => variant.title === variantText
      );
      return variant;
    }
    if (selectedColor) {
      const variantText = `${selectedColor}`;
      const variant = product.variants.find(
        (variant) => variant.title === variantText
      );
      return variant;
    }
  };

  return (
    <div className="text-dark">
      <section className="py-24 px-5 lg:px-16">
        <h1 className="text-4xl font-medium lg:text-midXl">Product Details</h1>
        {isSuccess ? (
          <>
            {imageGalleryVisibilty && (
              <ImageGallery
                images={product.images}
                toggleImageGallery={toggleImageGallery}
                imageGalleryVisibility={imageGalleryVisibilty}
              />
            )}
            <div className="mt-24 flex flex-col gap-8 lg:flex-row">
              <div className="w-full grid grid-cols-3 gap-8 lg:w-1/2">
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
              <div className="w-full flex flex-col justify-between gap-16 lg:w-1/2">
                <div className="flex flex-col gap-4 lg:gap-8">
                  <h2 className="text-xl font-medium lg:text-2xl">
                    {product.title}
                  </h2>
                  <p>{product.description}</p>
                  <span className="text-xl font-medium lg:text-2xl">
                    {formatPrice(getCurrentVariant().calculated_price_incl_tax)}
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
                    variantId={getCurrentVariant()?.id}
                    type="regular"
                  />
                </div>
              </div>
            </div>
          </>
        ) : isError ? (
          <span className="text-2xl text-center block text-red-300">
            Something went wrong.
          </span>
        ) : (
          <div className="flex items-center justify-center">
            <Loader type="lg" />
          </div>
        )}
      </section>
      <section className="py-24 px-16">
        <div className="mx-auto w-max py-2 px-8 bg-dark text-lightPink border-dark border rounded-sm">
          <h2>RELATED PRODUCTS</h2>
        </div>
        <div className="mt-24">{/* <ProductList /> */}</div>
      </section>
    </div>
  );
};

export default ProductDetails;
