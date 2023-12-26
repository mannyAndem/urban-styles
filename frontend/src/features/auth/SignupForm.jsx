import { useEffect, useState } from "react";
import {
  validateEmail,
  validateString,
  validatePassword,
} from "../../utils/formValidationFuncs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetSignupStatus, selectSignupStatus, signup } from "./AuthSlice";

import InputGroup from "../../components/InputGroup";
import ButtonPrimary from "../../components/ButtonPrimary";

const SignupForm = () => {
  const status = useSelector(selectSignupStatus);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // IMPLEMENT PHONE NUMBER LOGIC THEN ADD PHONE NUMBER TO FORM STATE!!!
  });

  const [formErrors, setFormErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const handleFormDataChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetFormErrors = () => {
    setFormErrors({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
    });
  };

  const validateForm = () => {
    resetFormErrors();

    const validFirstName = validateString(formData.firstName);
    const validLastName = validateString(formData.lastName);
    const validEmail = validateEmail(formData.email);
    const validPassword = validatePassword(formData.password);
    const validConfirmPassword = formData.password === formData.confirmPassword;

    if (!validFirstName) {
      setFormErrors((prev) => ({ ...prev, firstName: "Field is required" }));
    }
    if (!validLastName) {
      setFormErrors((prev) => ({ ...prev, lastName: "Field is required" }));
    }
    if (!validEmail) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email address" }));
    }
    if (!validPassword) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Password must be atleast 6 characters long",
      }));
    }
    if (!validConfirmPassword) {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords must match",
      }));
    }

    return (
      validFirstName &&
      validLastName &&
      validEmail &&
      validPassword &&
      validConfirmPassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validForm = validateForm();

    if (!validForm) {
      return;
    }

    dispatch(signup(formData));
  };

  useEffect(() => {
    if (status === "success") {
      dispatch(resetSignupStatus());
      navigate("/");
    }
  }, [status]);

  console.log(formData);
  return (
    <form onSubmit={handleSubmit}>
      {status === "error" && (
        <span className="block text-xl text-red-400 text-center">
          Failed to create account
        </span>
      )}
      <div className="grid grid-cols-2 gap-8">
        <InputGroup>
          <InputGroup.Label htmlFor="firstName">First Name</InputGroup.Label>
          <InputGroup.Input
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleFormDataChange}
          />
          <InputGroup.Error error={formErrors.firstName} />
        </InputGroup>
        <InputGroup>
          <InputGroup.Label htmlFor="lastName">Last Name</InputGroup.Label>
          <InputGroup.Input
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleFormDataChange}
          />
          <InputGroup.Error error={formErrors.lastName} />
        </InputGroup>
        <InputGroup>
          <InputGroup.Label htmlFor="email">Email</InputGroup.Label>
          <InputGroup.Input
            name="email"
            placeholder="johndoe24@example.com"
            value={formData.email}
            onChange={handleFormDataChange}
          />
          <InputGroup.Error error={formErrors.email} />
        </InputGroup>
        <InputGroup>
          <InputGroup.Label htmlFor="phone">Phone</InputGroup.Label>
          <InputGroup.Input name="phone" placeholder="+234 111 333 4444" />
        </InputGroup>
        <InputGroup>
          <InputGroup.Label htmlFor="password">Password</InputGroup.Label>
          <InputGroup.Input
            name="password"
            placeholder="Atleast 6 characters"
            value={formData.password}
            onChange={handleFormDataChange}
          />
          <InputGroup.Error error={formErrors.password} />
        </InputGroup>
        <InputGroup>
          <InputGroup.Label htmlFor="confirmPassword">
            Confirm Password
          </InputGroup.Label>
          <InputGroup.Input
            name="confirmPassword"
            placeholder="Should match password"
            value={formData.confirmPassword}
            onChange={handleFormDataChange}
          />
          <InputGroup.Error error={formErrors.confirmPassword} />
        </InputGroup>
      </div>
      <div className="mt-16 flex justify-center">
        <ButtonPrimary>CREATE ACCOUNT</ButtonPrimary>
      </div>
    </form>
  );
};

export default SignupForm;
