import ButtonPrimary from "../../../components/ButtonPrimary";
import AddShippingAddressForm from "../../../features/customer/AddShippingAddressForm";

import { useState } from "react";

const AddShippingAddress = () => {
  const [formVisible, setFormVisible] = useState(false);

  const toggleVisibility = () => {
    setFormVisible((prev) => !prev);
  };
  return (
    <div>
      <ButtonPrimary onClick={toggleVisibility}>
        {formVisible ? <span>Close Form</span> : <span>Add New Address</span>}
      </ButtonPrimary>
      <div className="mt-8"></div>
      {formVisible && <AddShippingAddressForm />}
    </div>
  );
};

export default AddShippingAddress;
