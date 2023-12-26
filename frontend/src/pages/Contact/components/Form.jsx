const Form = () => {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col">
        <input
          className="p-3 border-b bg-transparent border-gray text-dark placeholder-darkGray"
          placeholder="Enter your full name"
        />
      </div>
      <div className="flex flex-col">
        <input
          className="p-3 border-b bg-transparent border-gray text-dark placeholder-darkGray"
          placeholder="Enter your email"
        />
      </div>
      <div className="flex flex-col">
        <input
          className="p-3 border-b bg-transparent border-gray text-dark placeholder-darkGray"
          placeholder="Enter phone number (optional)"
        />
      </div>
      <div className="flex flex-col">
        <textarea
          className="p-3 border-b bg-transparent border-gray text-dark placeholder-darkGray"
          placeholder="Write Message"
          rows={5}
        ></textarea>
      </div>
      <button className="self-end bg-dark text-lightPink text-xl px-8 py-4 rounded-sm">
        Send Message
      </button>
    </form>
  );
};

export default Form;
