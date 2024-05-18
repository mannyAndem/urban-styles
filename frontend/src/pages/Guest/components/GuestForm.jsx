import { Formik } from "formik";
import * as yup from "yup";
import InputGroup from "../../../components/InputGroup";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { useUpdateCartMutation } from "../../../features/api/apiSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// TODO: MAKE CART EMAIL UPDATE WORK

const GuestForm = () => {
  const [updateCart, { isSuccess, isLoading, isError, error }] =
    useUpdateCartMutation();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const formSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    updateCart(values);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/checkout");
    }
    if (isError) {
      toast.error("Couldn't update your email");
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
          dirty,
          handleSubmit,
          isValid,
          handleChange,
        }) => (
          <form onSubmit={handleSubmit}>
            <InputGroup name="email" error={touched.email && errors.email}>
              <InputGroup.Label>Email</InputGroup.Label>
              <InputGroup.Input
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
              />
            </InputGroup>
            <div className="mt-16">
              <ButtonPrimary disabled={!dirty || !isValid} pending={isLoading}>
                Submit
              </ButtonPrimary>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default GuestForm;
