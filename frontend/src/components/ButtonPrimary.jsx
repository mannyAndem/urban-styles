import CircleLoader from "react-spinners/CircleLoader";

const ButtonPrimary = ({ children, onClick, pending }) => {
  if (pending) {
    return (
      <button
        disabled
        className="text-xl font-medium w-full bg-dark text-lightPink opacity-70 relative"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircleLoader color="#FFF4F4" size={20} />
        </div>
        <span className="opacity-0">{children}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick ? (e) => onClick(e) : null}
      className="w-full py-4 text-xl font-medium bg-dark text-lightPink rounded-md shadow-sm"
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
