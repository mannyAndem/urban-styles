import AddShippingAddressForm from "../../../features/cart/AddShippingAddressForm";
import { useEffect, useState } from "react";
import ChooseShippingOption from "../../../features/cart/ChooseShippingOption";
import StepStatus from "./StepStatus";
import PaymentForm from "../../../features/cart/PaymentForm";

const CheckoutForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  // const [currentStep, setCurrentStep] = useState(
  //   localStorage.getItem("checkoutStep") || 0
  // );

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // useEffect(() => {
  //   localStorage.setItem("checkoutStep", currentStep);
  // }, [currentStep]);

  const steps = [
    {
      label: "Add address",
      component: <AddShippingAddressForm nextStep={nextStep} />,
    },
    {
      label: "Select Shipping Option",
      component: <ChooseShippingOption nextStep={nextStep} />,
    },
    {
      label: "Pay",
      component: <PaymentForm nextStep={nextStep} />,
    },
  ];

  return (
    <div className="my-24">
      <div className="hidden items-center lg:flex">
        {steps.map((step, index) => (
          <StepStatus
            key={index}
            setCurrentStep={setCurrentStep}
            label={step.label}
            completed={currentStep > index}
            active={index === currentStep}
            index={index}
          />
        ))}
      </div>
      <div className="mt-24 w-full mx-auto lg:w-1/2">
        {steps[currentStep].component}
      </div>
    </div>
  );
};

export default CheckoutForm;
