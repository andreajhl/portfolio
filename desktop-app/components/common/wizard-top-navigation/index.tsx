import styles from "./styles.module.scss";
import { WithWizard } from "react-albus";
import { LeftArrowIcon } from "../icons";
import classes from "classnames";
import Maybe from "../helpers/maybe";

type WizardTopNavigationProps = {
  className?: string;
  enableNavigation?: boolean;
  onStepClick?: (goToClickedStep: () => void, isPreviousStep: boolean) => void;
};

function WizardTopNavigation({
  className = "",
  enableNavigation = false,
  onStepClick = () => {},
}: WizardTopNavigationProps) {
  function getClassName(currentStepIndex, stepIndex, stepItem) {
    if (currentStepIndex + 1 < stepIndex) {
      return styles.WizardTopNavigationStepUnreachable;
    }
    if (currentStepIndex === stepIndex) {
      return styles.WizardTopNavigationStepDoing;
    }
    if (currentStepIndex > stepIndex) {
      return styles.WizardTopNavigationStepDone;
    }
  }

  function stepClick(steps, currentStepIndex, clickedStepItem, push) {
    if (!enableNavigation) return;
    const clickedStepIndex = steps.findIndex(
      (stepItem) => stepItem?.id === clickedStepItem?.id
    );
    if (
      currentStepIndex === clickedStepIndex ||
      currentStepIndex + 1 < clickedStepIndex
    ) {
      return;
    }
    function goToClickedStep() {
      push(clickedStepItem.id);
    }
    onStepClick(goToClickedStep, currentStepIndex > clickedStepIndex);
  }

  return (
    <WithWizard>
      {({ steps, step, previous, push, ...rest }) => {
        const currentStepIndex = steps.findIndex(
          (currentStep) => currentStep?.id === step?.id
        );

        return (
          <div className={classes(styles.WizardTopNavigation, className)}>
            <Maybe it={currentStepIndex !== 0 && enableNavigation}>
              <LeftArrowIcon
                onClick={() => {
                  const previousStep = steps[currentStepIndex - 1];
                  stepClick(steps, currentStepIndex, previousStep, push);
                }}
                className={styles.WizardTopNavigationBackButton}
              />
            </Maybe>
            <ul className={styles.WizardTopNavigationStepsList}>
              {steps.map((stepItem, index) => (
                <li
                  key={index}
                  className={classes(
                    styles.WizardTopNavigationStep,
                    enableNavigation &&
                      styles.WizardTopNavigationStepEnabledNavigation,
                    getClassName(currentStepIndex, index, stepItem)
                  )}
                  onClick={() =>
                    stepClick(steps, currentStepIndex, stepItem, push)
                  }
                />
              ))}
            </ul>
          </div>
        );
      }}
    </WithWizard>
  );
}

export { WizardTopNavigation };
