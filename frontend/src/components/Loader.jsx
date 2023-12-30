import CircleLoader from "react-spinners/CircleLoader";
import DotLoader from "react-spinners/DotLoader";

const Loader = ({ type, color }) => {
  const size = type === "lg" ? 148 : type === "md" ? 96 : 20;
  return <DotLoader size={size} color={color ? color : "#1F0404"} />;
};

export default Loader;
