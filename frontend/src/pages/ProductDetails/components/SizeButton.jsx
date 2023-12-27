import { useNavigate } from "react-router-dom";

const SizeButton = ({ selectSize, size, selected }) => {
  return (
    <button
      className={`${
        selected ? "bg-dark text-lightPink" : ""
      } py-2 px-4 rounded-full  border-gray border-2`}
      onClick={() => selectSize(size)}
    >
      <span>{size}</span>
    </button>
  );
};

export default SizeButton;
