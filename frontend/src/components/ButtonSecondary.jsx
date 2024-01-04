import Loader from "./Loader";

const ButtonSecondary = ({ children, onClick, pending, filled, disabled }) => {
  if (pending) {
    return (
      <button
        disabled
        className="w-full text-dark p-3 bg-transparent border-2 border-dark opacity-70 relative"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
        <span className="opacity-0">{children}</span>
      </button>
    );
  }

  return (
    <button
      disabled={Boolean(disabled)}
      onClick={onClick ? (e) => onClick(e) : null}
      className={`${
        filled ? "bg-dark" : "bg-transparent"
      } w-full border-dark border-2 p-3 text-xl font-medium text-dark rounded-md shadow-sm`}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
