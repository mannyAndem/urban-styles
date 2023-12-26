const ColorButton = ({ color, selected, selectColor }) => {
  return (
    <button
      onClick={() => selectColor(color)}
      className={`${
        selected ? "bg-dark text-lightPink" : ""
      } rounded-full p-3 border-gray border-2`}
    >
      {color}
    </button>
  );
};

export default ColorButton;
