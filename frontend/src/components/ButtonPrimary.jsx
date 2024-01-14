import CircleLoader from "react-spinners/CircleLoader";
import Loader from "./Loader";

const ButtonPrimary = ({ disabled, children, onClick, pending }) => {
  const pendingClass = pending ? "opacity-0" : "";
  const disabledClass = disabled ? "opacity-70" : "";

  return (
    <button
      disabled={disabled || pending}
      onClick={onClick}
      className={`${disabledClass} relative whitespace-nowrap px-4 w-full py-4 font-medium bg-dark text-lightPink rounded-md shadow-sm lg:text-xl`}
    >
      {pending && (
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <Loader color="#FFF4F4" />
        </div>
      )}
      <div className={`${pendingClass} flex items-center justify-center`}>
        {children}
      </div>
    </button>
  );
};

export default ButtonPrimary;
