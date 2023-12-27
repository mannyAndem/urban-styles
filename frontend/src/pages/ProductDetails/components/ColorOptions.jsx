import { useNavigate } from "react-router-dom";
import ColorButton from "./ColorButton";

const ColorOptions = ({ colors, selectedColor, selectColor }) => {
  if (colors.length === 0) {
    return <></>;
  }
  return (
    <div className="flex items-center gap-4">
      {colors.map((color, index) => (
        <ColorButton
          key={index}
          color={color}
          selectColor={selectColor}
          selected={selectedColor === color}
        />
      ))}
    </div>
  );
};

export default ColorOptions;
