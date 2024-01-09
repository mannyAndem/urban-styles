const StepStatus = ({ active, completed, label, index }) => {
  return (
    <div
      className={`${
        active ? "opacity-100" : "opacity-30"
      } w-full flex items-center`}
    >
      <div
        className={`${
          completed ? "bg-dark text-lightPink" : "bg-transparent text-dark"
        } text-xl font-medium h-10 w-10 flex items-center justify-center rounded-full border-dark border-2`}
      >
        {index + 1}
      </div>
      <div className="text-xl font-medium px-4 py-2 border-b-4 rounded-md border-dark w-full">
        {label}
      </div>
    </div>
  );
};

export default StepStatus;
