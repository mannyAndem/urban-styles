import { useState } from "react";
import arrowWhite from "../../../assets/icons/arrow-right-white.png";
import { handleEventWithoutPropagation } from "../../../utils/handleEventWithoutPropagation";

const ImageGallery = ({ images, toggleImageGallery }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const slideRight = () => {
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
      return;
    }
    setCurrentImage((prev) => prev + 1);
  };
  const slideLeft = () => {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1);
      return;
    }
    setCurrentImage((prev) => prev - 1);
  };

  return (
    <div
      onClick={toggleImageGallery}
      className="z-50 p-5 fixed top-0 left-0 bg-gray bg-opacity-50 h-screen w-screen flex justify-center items-center cursor-zoom-out lg:p-16"
    >
      <div className="aspect-square py-16 h-full flex gap-8 justify-between cursor-default w-2/3">
        <button
          onClick={(e) => handleEventWithoutPropagation(e, slideLeft)}
          className="bg-gray bg-opacity-20 rounded-md py-4 h-full flex justify-center items-center p-3"
        >
          <img src={arrowWhite} className="transform rotate-180 w-12 h-12" />
        </button>
        <div className="w-full overflow-hidden flex rounded-sm shadow-sm ">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              style={{ transform: `translate(${-100 * currentImage}%, 0)` }}
              className={` shrink-0 transition duration-500 ease-out w-full h-full object-contain transform`}
            />
          ))}
        </div>
        <button
          onClick={(e) => handleEventWithoutPropagation(e, slideRight)}
          className="bg-gray bg-opacity-20 rounded-md h-full flex justify-center items-center p-3"
        >
          <img src={arrowWhite} className=" w-12 h-12" />
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
