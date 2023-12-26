const ButtonSecondary = ({ children, onClick, pending }) => {
  if (pending) {
    return (
      <button
        disabled
        className="w-full text-dark bg-transparent border-2 border-dark opacity-70 relative"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircleLoader color="#FFF4F4" size={20} loading />
        </div>
        <span className="opacity-0">{children}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick ? (e) => onClick(e) : null}
      className="w-full border-dark border-2 py-4 text-xl font-medium bg-ttansparent text-dark rounded-md shadow-sm"
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
