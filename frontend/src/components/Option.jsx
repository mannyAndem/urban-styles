import { useSelectContext } from "./Select";

/**
 * Expects an option prop object with the properties title and value.
 */
const Option = ({ title, value }) => {
  const { handleChange } = useSelectContext();

  if (!handleChange) {
    throw new Error(
      "Option element can only be used within the context of a Select element"
    );
  }

  return (
    <button
      type="button"
      onClick={() => handleChange(value)}
      className="rounded-md transition-all duration-150 ease-out font-medium text-left p-2 hover:bg-dark hover:text-lightPink"
    >
      {title}
    </button>
  );
};

export default Option;
