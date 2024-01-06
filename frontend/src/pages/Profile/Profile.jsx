import { useSelector } from "react-redux";
import { selectCustomer } from "../../features/customer/customerSlice";
import WelcomeUser from "./components/WelcomeUser";
import PersonalDetails from "./components/PersonalDetails";
import ShippingAddresses from "./components/ShippingAddresses";

const Profile = () => {
  const customer = useSelector(selectCustomer);

  return (
    <div className="py-24 px-16">
      <WelcomeUser name={customer.first_name} />
      <div className="my-24 grid grid-cols-2 gap-8 items-start">
        <PersonalDetails customer={customer} />
        <ShippingAddresses customer={customer} />
      </div>
    </div>
  );
};

export default Profile;
