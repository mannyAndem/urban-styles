import { useDebugValue, useEffect, useState } from "react";
import InputGroup from "../../components/InputGroup";
import axios from "axios";
import Select from "../../components/Select";

const AddShippingAddressForm = () => {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchCountries = async () => {
      const response = await axios.get(
        "https://restcountries.com/v3.1/independent",
        {
          signal,
          params: {
            fields: "name,cca2",
          },
        }
      );
      let countries = response.data.toSorted((a, b) =>
        a.name.common > b.name.common ? 1 : -1
      );
      //   mapping the countries data to the form the Select element expects
      countries = countries.map((country) => ({
        title: country.name.common,
        value: country.cca2,
      }));
      console.log(countries);
      setCountries(countries);
      console.log(response.data);
    };

    fetchCountries();
    return () => {
      controller.abort();
    };
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
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

  console.log(formData);

  return (
    <form className="flex flex-col gap-4 ">
      <InputGroup>
        <InputGroup.Label htmlFor="email">Address</InputGroup.Label>
        <InputGroup.Input
          name="address"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleFormDataChange}
        />
        <InputGroup.Error error={formErrors.address} />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="email">City</InputGroup.Label>
        <InputGroup.Input
          name="city"
          placeholder="Enter address"
          value={formData.city}
          onChange={handleFormDataChange}
        />
        <InputGroup.Error error={formErrors.city} />
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="email">Country Code</InputGroup.Label>
        {countries && (
          <Select
            data={countries}
            name="country_code"
            value={formData.country_code}
            onChange={handleFormDataChange}
          />
        )}
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
    </form>
  );
};

export default AddShippingAddressForm;
