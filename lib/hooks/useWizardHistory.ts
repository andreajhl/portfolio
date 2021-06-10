import { createMemoryHistory } from "history";
import { useEffect, useMemo, useState } from "react";

type WizardStepType = {
  id: string;
};

type UseWizardHistoryType = (
  stepsList: WizardStepType[],
  initialStep: WizardStepType
) => {
  wizardHistory: any;
  nextStep: () => void;
};

const useWizardHistory: UseWizardHistoryType = function (
  stepsList,
  initialStep = stepsList[0]
) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const wizardHistory = useMemo(() => createMemoryHistory(), []);

  useEffect(() => {
    if (!currentStep?.id) return;
    wizardHistory.push(currentStep?.id);
  }, [currentStep, wizardHistory]);

  function getNextStep(currentStep) {
    const currentStepIndex = stepsList.indexOf(currentStep);
    const nextStepIndex = currentStepIndex + 1;
    return stepsList[nextStepIndex] || currentStep;
  }

  function nextStep() {
    setCurrentStep(getNextStep);
  }

  return { wizardHistory, nextStep };
};

export default useWizardHistory;
