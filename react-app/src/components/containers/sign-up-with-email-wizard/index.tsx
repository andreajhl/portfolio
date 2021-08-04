import { redirectToAfterAuthPath, useAuth } from "lib/famosos-auth";
import { useState } from "react";
import {
  SignUpEmailPasswordForm,
  SignUpEmailPasswordFormProps,
} from "../sign-up-with-email-form";
import { ValidateEmailForm } from "../validate-email-form";

const STEPS = ["sign-up", "validate-security-code"] as const;
type CurrentStepType = typeof STEPS[number];

type SignUpWithEmailWizardProps = {} & SignUpEmailPasswordFormProps;

function SignUpWithEmailWizard({
  willRedirect,
  initialValues,
}: SignUpWithEmailWizardProps) {
  const [currentStep, setCurrentStep] = useState<CurrentStepType>(STEPS[0]);
  const [signUpData, setSignUpData] = useState(initialValues);
  const { logout } = useAuth();

  function changeToValidationStep(newSignUpData) {
    setSignUpData(newSignUpData);
    setCurrentStep(STEPS[1]);
  }

  function changeToSignUpStep() {
    setCurrentStep(STEPS[0]);
    logout();
  }

  if (currentStep === STEPS[0]) {
    return (
      <SignUpEmailPasswordForm
        willRedirect={willRedirect}
        initialValues={signUpData}
        onSignUpSuccess={changeToValidationStep}
      />
    );
  }
  if (currentStep === STEPS[1]) {
    return (
      <ValidateEmailForm
        email={signUpData.email}
        onGoBackButtonClick={changeToSignUpStep}
        onValidationSuccess={redirectToAfterAuthPath}
      />
    );
  }
  return null;
}

export { SignUpWithEmailWizard };
