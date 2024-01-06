const AddressCard = ({ address, index }) => {
  return (
    <div className="border border-dark rounded-md p-4">
      <h2 className="text-xl font-medium pb-4 border-b border-dark mb-4">
        Address {index + 1}
      </h2>
      <div className="flex items-center justify-between">
        <span>Address:</span>
        <span>{address.address_1}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>City:</span>
        <span>{address.city}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Postal Code:</span>
        <span>{address.postal_code}</span>
      </div>
    </div>
  );
};

export default AddressCard;
