import { useEffect, useState } from "react";
import {
  validateEmail,
  validatePassword,
} from "../../utils/formValidationFuncs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  login,
  resetLoginStatus,
  selectLoginError,
  selectLoginStatus,
} from "./customerSlice";
import InputGroup from "../../components/InputGroup";
import ButtonPrimary from "../../components/ButtonPrimary";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
  const dispatch = useDispatch();

  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  });

  const handleFormDataChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetFormErrors = () => {
    setFormErrors({
      email: null,
      password: null,
    });
  };

  const validateForm = () => {
    resetFormErrors();
    const validEmail = validateEmail(formData.email);
    const validPassword = validatePassword(formData.password);

    if (!validEmail) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email address" }));
    }
    if (!validPassword) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Password must be atleast 6 characters long",
      }));
    }

    return validEmail && validPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validForm = validateForm();

    if (!validForm) {
      return;
    }

    dispatch(login(formData));
  };

  useEffect(() => {
    if (status === "success") {
      dispatch(resetLoginStatus());
      navigate(state.from ?? "/");
    }
    if (status === "error") {
      toast.error(error);
      dispatch(resetLoginStatus());
    }
  }, [status]);

  return (
    <form onSubmit={handleSubmit}>
      <Toaster />
      {status === "error" && (
        <span className="block text-xl text-center text-red-400">{error}</span>
      )}
      <div className="flex flex-col gap-8">
        <InputGroup>
          <InputGroup.Label htmlFor="email">Email</InputGroup.Label>
          <InputGroup.Input
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleFormDataChange}
          />
          <InputGroup.Error error={formErrors.email} />
        </InputGroup>
        <InputGroup>
          <InputGroup.Label htmlFor="password">Password</InputGroup.Label>
          <InputGroup.Input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleFormDataChange}
          />
          <InputGroup.Error error={formErrors.password} />
        </InputGroup>
      </div>
      <div className="mt-16 flex justify-center">
        <ButtonPrimary pending={status === "pending"}>LOGIN</ButtonPrimary>
      </div>
    </form>
  );
};

export default LoginForm;
