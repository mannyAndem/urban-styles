import CircleLoader from "react-spinners/CircleLoader";
import DotLoader from "react-spinners/DotLoader";

const Loader = ({ type, color }) => {
  const size = type === "lg" ? 148 : type === "md" ? 96 : 20;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <DotLoader size={size} color={color ? color : "#1F0404"} />
    </div>
  );
};

export default Loader;
