import Input from "./Input";

const InputGroup = ({ children }) => {
  return <div className="text-dark flex flex-col gap-4">{children}</div>;
};

InputGroup.Label = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="font-medium">
      {children}
    </label>
  );
};

InputGroup.Input = ({ type, name, placeholder, value, onChange }) => {
  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

InputGroup.Error = ({ error }) => {
  return (
    error && <span className="text-sm font-medium text-red-400">{error}</span>
  );
};

export default InputGroup;
