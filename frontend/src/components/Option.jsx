const Option = ({ title, value }) => {
  return (
    <option value={value} title={title} className="bg-lightPink text-dark">
      {title}
    </option>
  );
};

export default Option;
