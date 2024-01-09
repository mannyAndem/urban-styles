import { useEffect, useState } from "react";
import InputGroup from "../../components/InputGroup";
import axios from "axios";
import Select from "../../components/Select";
import Option from "../../components/Option";
import Loader from "../../components/Loader";
import { validateString } from "../../utils/formValidationFuncs";
import { useDispatch, useSelector } from "react-redux";
import { selectCustomer } from "../customer/customerSlice";
import ButtonPrimary from "../../components/ButtonPrimary";
import { toast, Toaster } from "react-hot-toast";
import {
  addShippingAddress,
  selectAddShippingAddressError,
  selectAddShippingAddressStatus,
} from "./cartSlice";

const AddShippingAddressForm = ({ nextStep }) => {
  const [countries, setCountries] = useState(null);
  const [countriesStatus, setCountriesStatus] = useState("pending");
  const currentUser = useSelector(selectCustomer);
  const status = useSelector(selectAddShippingAddressStatus);
  const error = useSelector(selectAddShippingAddressError);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/independent",
          {
            signal,
            params: {
              fields: "name,cca2",
            },
          }
        );
        const countries = response.data.toSorted((a, b) =>
          a.name.common > b.name.common ? 1 : -1
        );
        //   mapping the countries data to the form the Select element expects
        console.log(response.data);
        setCountries(countries);
        setCountriesStatus("success");
      } catch (err) {
        setCountriesStatus("error");

        if (err.code === "ERR_NETWORK") {
          setError("Can't connect to the internet");
        } else {
          setError("Something went wrong.");
        }
      }
    };

    fetchCountries();
    return () => {
      controller.abort();
    };
  }, []);

  const [formData, setFormData] = useState({
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    address_1: "",
    city: "",
    country_code: "",
    postal_code: "",
  });

  const [formErrors, setFormErrors] = useState({});

  //   function to handle input change
  const handleFormDataChange = (e) => {
    console.log("handleFormDataChange ran");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    setFormErrors({});

    const validAddress = validateString(formData.address_1);
    const validCity = validateString(formData.city);
    const validCountryCode = validateString(formData.country_code);
    const validPostalCode = validateString(formData.postal_code);

    if (!validAddress) {
      setFormErrors((prev) => ({ ...prev, address_1: "Address is required" }));
    }
    if (!validCity) {
      setFormErrors((prev) => ({ ...prev, city: "City is required" }));
    }
    if (!validCountryCode) {
      setFormErrors((prev) => ({
        ...prev,
        country_code: "Country code is required",
      }));
    }
    if (!validPostalCode) {
      setFormErrors((prev) => ({
        ...prev,
        postal_code: "Postal Code is required",
      }));
    }

    return validAddress && validCity && validCountryCode && validPostalCode;
  };

  const resetFormData = () => {
    setFormData((prev) => ({
      ...prev,
      address_1: "",
      city: "",
      country_code: "",
      postal_code: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log(formData);
    dispatch(addShippingAddress(formData));
  };

  useEffect(() => {
    if (status === "success") {
      toast.success("Address added successfully");
      resetFormData();
      nextStep();
    }
    if (status === "error") {
      toast.error(error);
    }
  }, [status]);

  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
      <Toaster />
      <InputGroup>
        <InputGroup.Label htmlFor="email">Address</InputGroup.Label>
        <InputGroup.Input
          name="address_1"
          placeholder="Enter address"
          value={formData.address_1}
          onChange={handleFormDataChange}
        />
        <InputGroup.Error error={formErrors.address_1} />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="email">City</InputGroup.Label>
        <InputGroup.Input
          name="city"
          placeholder="Enter your city"
          value={formData.city}
          onChange={handleFormDataChange}
        />
        <InputGroup.Error error={formErrors.city} />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="email">Country Code</InputGroup.Label>
        <Select
          name="country_code"
          value={formData.country_code}
          onChange={handleFormDataChange}
        >
          {countriesStatus === "success" ? (
            countries.map((country, index) => (
              <Option
                key={index}
                title={country.name.common}
                value={country.cca2.toLowerCase()}
              />
            ))
          ) : countriesStatus === "pending" ? (
            <Loader />
          ) : (
            <div></div>
          )}
        </Select>
        <InputGroup.Error error={formErrors.country_code} />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="email">Postal Code</InputGroup.Label>
        <InputGroup.Input
          name="postal_code"
          placeholder="Enter postal code"
          value={formData.postal_code}
          onChange={handleFormDataChange}
        />
        <InputGroup.Error error={formErrors.postal_code} />
      </InputGroup>
      <ButtonPrimary pending={status === "pending"}>PROCEED</ButtonPrimary>
    </form>
  );
};

export default AddShippingAddressForm;
