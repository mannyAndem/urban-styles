import { createContext, useContext } from "react";
import Input from "./Input";
import { useField } from "formik";
import Select from "./Select";

const InputGroupContext = createContext(null);

const useInputGroupContext = () => useContext(InputGroupContext);

const InputGroup = ({ children, name, error, id }) => {
  return (
    <InputGroupContext.Provider value={{ name, error, id }}>
      <div className="text-dark flex flex-col gap-4 w-full">
        {children}
        {error && (
          <span className="text-sm font-medium text-red-400">{error}</span>
        )}
      </div>
    </InputGroupContext.Provider>
  );
};

InputGroup.Label = ({ children }) => {
  const { name, id } = useInputGroupContext();

  return (
    <label htmlFor={id ? id : name} className="font-medium">
      {children}
    </label>
  );
};

InputGroup.Input = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  ...rest
}) => {
  const { name, id, error } = useInputGroupContext();

  return (
    <Input
      type={type}
      id={id ? id : name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      invalid={!!error}
      onBlur={onBlur}
      {...rest}
    />
  );
};

InputGroup.Select = ({
  children,
  value,
  onChange,
  placeholder,
  onBlur,
  ...rest
}) => {
  const { name, id, error } = useInputGroupContext();

  return (
    <Select
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      onBlur={onBlur}
      {...rest}
    >
      {children}
    </Select>
  );
};

// Remove once you've fixed the components that require it.
InputGroup.Error = ({ error }) => {
  return (
    error && <span className="text-sm font-medium text-red-400">{error}</span>
  );
};

export default InputGroup;
