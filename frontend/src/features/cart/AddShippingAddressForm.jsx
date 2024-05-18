import { useEffect, useState } from "react";
import InputGroup from "../../components/InputGroup";

import Select from "../../components/Select";
import Option from "../../components/Option";
import Loader from "../../components/Loader";
import { validateString } from "../../utils/formValidationFuncs";
import { useDispatch, useSelector } from "react-redux";
import { selectCustomer } from "../customer/customerSlice";
import ButtonPrimary from "../../components/ButtonPrimary";
import { toast, Toaster } from "react-hot-toast";
import * as yup from "yup";
import { Formik } from "formik";
import { countries } from "../../utils/countries";
import { useUpdateCartMutation } from "../api/apiSlice";

const AddShippingAddressForm = ({ nextStep }) => {
  const [updateCart, { isSuccess, isLoading, isError, error, data }] =
    useUpdateCartMutation();
  const currentUser = useSelector(selectCustomer);
  const initialValues = {
    first_name: currentUser?.first_name ?? "",
    last_name: currentUser?.last_name ?? "",
    address_1: "",
    address_2: "",
    city: "",
    country_code: "",
    postal_code: "",
  };

  const formSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    address_1: yup.string().required("Address is required"),
    address_2: yup.string().notRequired(),
    city: yup.string().required("City is required"),
    country_code: yup.string().required(""),
    postal_code: yup.string().required("Postal code is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    updateCart({ shipping_address: { ...values } });
  };

  useEffect(() => {
    if (isSuccess) {
      nextStep();
    }
    if (isError) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          dirty,
          isValid,
          handleChange,
          handleBlur,
        }) => (
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <InputGroup
                name="first_name"
                error={touched.first_name && errors.first_name}
              >
                <InputGroup.Label>First Name</InputGroup.Label>
                <InputGroup.Input
                  placeholder="First name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputGroup>
              <InputGroup
                name="last_name"
                error={touched.last_name && errors.last_name}
              >
                <InputGroup.Label>Last Name</InputGroup.Label>
                <InputGroup.Input
                  placeholder="Last name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputGroup>
            </div>

            <InputGroup
              name="country_code"
              error={touched.country_code && errors.country_code}
            >
              <InputGroup.Label>Country</InputGroup.Label>
              <InputGroup.Select
                value={values.country_code}
                onChange={handleChange}
                placeholder="Select Country"
                onBlur={handleBlur}
              >
                <Option value="" title="Choose a country" />
                {countries.map((country) => (
                  <Option
                    key={country.code}
                    value={country.code.toLocaleLowerCase()}
                    title={country.name}
                  />
                ))}
              </InputGroup.Select>
            </InputGroup>
            <InputGroup name="city" error={touched.city && errors.city}>
              <InputGroup.Label>City</InputGroup.Label>
              <InputGroup.Input
                placeholder="City"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>
            <InputGroup
              name="address_1"
              error={touched.address_1 && errors.address_1}
            >
              <InputGroup.Label>Address 1</InputGroup.Label>
              <InputGroup.Input
                placeholder="Street Name, House No., etc"
                value={values.address_1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>
            <InputGroup
              name="address_2"
              error={touched.address_2 && errors.address_2}
            >
              <InputGroup.Label>Address 2 (Optional)</InputGroup.Label>
              <InputGroup.Input
                placeholder="Apartment No., Room No., etc"
                value={values.address_2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>
            <InputGroup
              name="postal_code"
              error={touched.postal_code && errors.postal_code}
            >
              <InputGroup.Label>Postal Code</InputGroup.Label>
              <InputGroup.Input
                placeholder="Postal code"
                value={values.postal_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputGroup>

            <ButtonPrimary disabled={!isValid || !dirty} pending={isLoading}>
              PROCEED
            </ButtonPrimary>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddShippingAddressForm;
