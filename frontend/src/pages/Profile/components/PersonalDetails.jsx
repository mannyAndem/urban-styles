const PersonalDetails = ({ customer }) => {
  return (
    <div className="text-dark p-8 rounded-md shadow-md border-2 border-dark">
      <h2 className="text-3xl">Personal Details</h2>
      <div className="my-16 text-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">First Name: </span>
          <span>{customer.first_name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Last Name: </span>
          <span>{customer.last_name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Email: </span>
          <span>{customer.email}</span>
        </div>
        {customer.phone && (
          <div className="flex items-center justify-between">
            <span className="font-medium">Phone: </span>
            <span>{customer.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;
