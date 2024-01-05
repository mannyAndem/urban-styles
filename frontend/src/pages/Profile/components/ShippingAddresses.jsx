import Select from "../../../components/Select";
import AddShippingAddressForm from "../../../features/customer/AddShippingAddressForm";
import AddShippingAddress from "./AddShippingAddress";

const ShippingAddresses = ({ customer }) => {
  return (
    <div className="text-dark p-8 rounded-md shadow-md border-2 border-dark">
      <h2 className="text-3xl">Shipping Addresses</h2>
      <div className="my-16 text-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">First Name: </span>
          <span>{customer.first_name}</span>
        </div>
      </div>
      <AddShippingAddress />
      <AddShippingAddressForm />
    </div>
  );
};

export default ShippingAddresses;
