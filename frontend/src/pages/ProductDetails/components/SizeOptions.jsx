import SizeButton from "./SizeButton";
import { useEffect, useState } from "react";

const SizeOptions = ({ sizes, selectedSize, selectSize }) => {
  if (sizes.length === 0) {
    return <></>;
  }

  return (
    <div className="flex items-center gap-6">
      {sizes.map((size, index) => (
        <SizeButton
          key={index}
          size={size}
          selectSize={selectSize}
          selected={selectedSize === size}
        />
      ))}
    </div>
  );
};

export default SizeOptions;
