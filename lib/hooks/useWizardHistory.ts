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
  getCurrentStep: () => WizardStepType;
};

const useWizardHistory: UseWizardHistoryType = function (
  stepsList,
  initialStep = stepsList[0]
) {
  const wizardHistory = useMemo(() => createMemoryHistory(), []);

  useEffect(() => {
    if (!initialStep?.id) return;
    wizardHistory.push(initialStep?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getCurrentStep() {
    const currentStepId = wizardHistory?.location?.pathname?.replace?.("/", "");
    return stepsList.find(({ id }) => id === currentStepId);
  }

  function nextStep() {
    const currentStep = getCurrentStep();
    const currentStepIndex = stepsList.indexOf(currentStep);
    const nextStepIndex = currentStepIndex + 1;
    const nextStep = stepsList[nextStepIndex] || currentStep;
    wizardHistory?.push(nextStep?.id);
  }

  return { wizardHistory, nextStep, getCurrentStep };
};

export default useWizardHistory;
