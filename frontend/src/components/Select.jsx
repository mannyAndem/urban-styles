import arrowDown from "../assets/icons/arrow-down-icon.png";

const Select = ({
  children,
  name,
  value,
  onChange,
  color,
  type,
  invalid,
  id,
  onBlur,
  ...rest
}) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      aria-invalid={invalid}
      style={{
        backgroundImage: `url(${arrowDown})`,
        backgroundPosition: "right 12px center",
        backgroundSize: "20px",
      }}
      className={`w-full p-3 rounded-md placeholder-opacity-70 appearance-none bg-transparent border ${
        color
          ? `placeholder-[${color}] text-[${color}] border-[${color}]`
          : "text-dark border-lightGray placeholder-gray"
      } focus:outline-dark aria-[invalid=true]:border-red-400 aria-[invalid=true]:outline-red-400 aria-[invalid=true]:bg-red-100 aria-[invalid]:bg-opacity-40 lg:text-xl lg:p-4 bg-no-repeat`}
      onBlur={onBlur}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
