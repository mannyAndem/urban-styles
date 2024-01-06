import CircleLoader from "react-spinners/CircleLoader";
import Loader from "./Loader";

const ButtonPrimary = ({ children, onClick, pending }) => {
  if (pending) {
    return (
      <button
        disabled
        className="relative whitespace-nowrap px-4 w-full py-4 text-xl font-medium bg-dark text-lightPink rounded-md shadow-sm"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <Loader color="#FFF4F4" />
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
