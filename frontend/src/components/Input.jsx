const Input = ({ name, value, onChange, color, type, placeholder }) => {
  return (
    <input
      autoComplete="off"
      type={type ? type : "text"}
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      className={`w-full p-2 rounded-md placeholder-opacity-70 bg-transparent border-2 ${
        color
          ? `placeholder-[${color}] text-[${color}] border-[${color}]`
          : "text-gray border-gray placeholder-gray"
      } focus:outline-dark`}
    />
  );
};

export default Input;
