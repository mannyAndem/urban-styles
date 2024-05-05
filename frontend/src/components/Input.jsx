const Input = ({
  name,
  value,
  onChange,
  color,
  type,
  placeholder,
  invalid,
  id,
}) => {
  return (
    <input
      id={id}
      autoComplete="off"
      type={type ? type : "text"}
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      aria-invalid={invalid}
      className={`w-full p-3 rounded-md placeholder-opacity-70 bg-transparent border ${
        color
          ? `placeholder-[${color}] text-[${color}] border-[${color}]`
          : "text-dark border-lightGray placeholder-gray"
      } focus:outline-dark aria-[invalid=true]:border-red-400 aria-[invalid=true]:outline-red-400 aria-[invalid=true]:bg-red-100 aria-[invalid]:bg-opacity-40 lg:text-xl lg:p-4`}
    />
  );
};

export default Input;
