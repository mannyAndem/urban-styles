import { useNavigate } from "react-router-dom";
import InputGroup from "../../components/InputGroup";
import ButtonPrimary from "../../components/ButtonPrimary";
import * as yup from "yup";
import { Formik } from "formik";
import { useSignupMutation } from "../api/apiSlice";
import { useEffect } from "react";
import { setCustomer } from "./customerSlice";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

const SignupForm = () => {
  const [signup, { isLoading, isError, isSuccess, error, data }] =
    useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const formSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be atleast 6 characters"),
    confirm_password: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = (values) => {
    const { confirm_password, ...data } = values;
    signup(data);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCustomer(data.customer));
      toast.success("Account created successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    if (isError) {
      toast.error("We couldn't create your account");
    }
  }, [isSuccess, isError, error]);

  return (
    <>
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <InputGroup name="first_name">
                <InputGroup.Label>First Name</InputGroup.Label>
                <InputGroup.Input
                  placeholder="John"
                  value={values.first_name}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup name="last_name">
                <InputGroup.Label>Last Name</InputGroup.Label>
                <InputGroup.Input
                  placeholder="Doe"
                  value={values.last_name}
                  onChange={handleChange}
                />
              </InputGroup>
            </div>
            <InputGroup name="email">
              <InputGroup.Label>Email</InputGroup.Label>
              <InputGroup.Input
                placeholder="johndoe@example.com"
                value={values.email}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup name="password">
              <InputGroup.Label>Password</InputGroup.Label>
              <InputGroup.Input
                placeholder="Enter Password"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup name="confirm_password">
              <InputGroup.Label>Confirm Password</InputGroup.Label>
              <InputGroup.Input
                placeholder="Confirm Password"
                value={values.confirm_password}
                onChange={handleChange}
                type="password"
              />
            </InputGroup>
            <div className="mt-16 flex justify-center">
              <ButtonPrimary pending={isLoading}>CREATE ACCOUNT</ButtonPrimary>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
