import Loader from "./Loader";

const ButtonSecondary = ({ children, onClick, pending, filled, disabled }) => {
  if (pending) {
    return (
      <button
        disabled
        className="w-full whitespace-nowrap text-dark p-3 bg-transparent border-2 border-dark opacity-70 relative lg:text-xl"
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
      disabled={Boolean(disabled)}
      onClick={onClick ? (e) => onClick(e) : null}
      className={`${
        filled ? "bg-dark" : "bg-transparent"
      } w-full border-dark border-2 p-3 whitespace-nowrap font-medium text-dark rounded-md shadow-sm lg:text-xl`}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
