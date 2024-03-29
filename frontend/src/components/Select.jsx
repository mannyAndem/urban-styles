import arrowDown from "../assets/icons/arrow-down-icon.png";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const SelectContext = createContext();

const Select = ({ children, value, onChange, name }) => {
  const [selectValue, setSelectValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (value) => {
    setSelectValue(value);
  };

  const handleSearchValueChange = (e) => {
    setSelectValue(null);
    setSearchValue(e.target.value);
  };

  const inputRef = useRef();

  //   useEffect to attach event listener passed as props on mount
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    inputRef.current.addEventListener("change", (e) => onChange(e), { signal });

    return () => {
      abortController.abort();
    };
  }, []);

  //   useEffect to synthetically fire change event when selectValue state changes
  useEffect(() => {
    const e = new Event("change");
    inputRef.current.dispatchEvent(e);
  }, [selectValue]);

  return (
    <SelectContext.Provider value={{ handleChange, searchValue }}>
      <div className="relative w-full">
        <input
          className="cursor-pointer bg-[image:var(--image-url)] bg-no-repeat bg-[right_12px_center] peer w-full p-2 rounded-md bg-transparent border text-gray border-lightGray"
          name={name}
          value={selectValue ?? searchValue}
          onChange={handleSearchValueChange}
          ref={inputRef}
          style={{ "--image-url": `url(${arrowDown})` }}
        />
        <div className="z-20 peer-focus:scale-y-100 hover:scale-y-100 scale-y-0  origin-top max-h-[300px] transition-all duration-300 ease-out overflow-y-scroll top-[100%] left-0 right-0 absolute backdrop-blur-md bg-opacity-60 bg-lightPink p-4 rounded-md shadow-sm flex flex-col">
          {children}
        </div>
      </div>
    </SelectContext.Provider>
  );
};

export default Select;

export const useSelectContext = () => useContext(SelectContext);
