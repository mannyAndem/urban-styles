import CircleLoader from "react-spinners/CircleLoader";
import Loader from "./Loader";

const ButtonPrimary = ({ children, onClick, pending }) => {
  if (pending) {
    return (
      <button
        disabled
        className="whitespace-nowrap px-4 text-xl font-medium w-full bg-dark text-lightPink opacity-70 relative"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
        <div className="opacity-0">{children}</div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick ? (e) => onClick(e) : null}
      className="whitespace-nowrap px-4 w-full py-4 text-xl font-medium bg-dark text-lightPink rounded-md shadow-sm"
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
