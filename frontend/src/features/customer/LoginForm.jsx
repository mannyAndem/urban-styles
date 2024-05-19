import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputGroup from "../../components/InputGroup";
import ButtonPrimary from "../../components/ButtonPrimary";
import toast, { Toaster } from "react-hot-toast";
import { useLoginMutation } from "../api/apiSlice";
import { Formik } from "formik";
import * as yup from "yup";
import { setCustomer } from "./customerSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [login, { isLoading, isSuccess, isError, data, error }] =
    useLoginMutation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const formSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    login(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCustomer(data.customer));
      toast.success("Logged in successfully");

      setTimeout(() => {
        navigate(state?.from ?? "/");
      }, 1000);
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
          handleChange,
          values,
          errors,
          handleSubmit,
          dirty,
          isValid,
          touched,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <Toaster />
            <div className="flex flex-col gap-8">
              <InputGroup name="email" error={touched.email && errors.email}>
                <InputGroup.Label>Email</InputGroup.Label>
                <InputGroup.Input
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputGroup>
              <InputGroup
                name="password"
                error={touched.password && errors.password}
              >
                <InputGroup.Label>Password</InputGroup.Label>
                <InputGroup.Input
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                  onBlur={handleBlur}
                />
              </InputGroup>
            </div>
            <div className="mt-16 flex justify-center">
              <ButtonPrimary pending={isLoading} disabled={!isValid || !dirty}>
                LOGIN
              </ButtonPrimary>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
