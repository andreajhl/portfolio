import styles from "./styles.module.scss";
import { WithWizard } from "react-albus";
import { LeftArrowIcon } from "../icons";
import classes from "classnames";
import Maybe from "../helpers/maybe";

type WizardTopNavigationProps = {
  className?: string;
  enableNavigation?: boolean;
  onStepClick?: (goToClickedStep: () => void) => void;
};

function WizardTopNavigation({
  className = "",
  enableNavigation = false,
  onStepClick = () => {}
}: WizardTopNavigationProps) {
  function getClassName(steps, step, index, stepItem) {
    const stepIndex = steps.indexOf(step);
    if (stepIndex === index) {
      return styles.WizardTopNavigationStepDoing;
    } else if (stepIndex > index /* || stepItem.isDone */) {
      // stepItem.isDone = true;
      return styles.WizardTopNavigationStepDone;
    }
  }

  function stepClick(stepItem, push) {
    if (!enableNavigation) return;
    function goToClickedStep() {
      push(stepItem.id);
    }
    onStepClick(goToClickedStep);
  }

  return (
    <WithWizard>
      {({ steps, step, previous, push, ...rest }) => {
        const currentStepIndex = steps.indexOf(step);

        return (
          <div className={classes(styles.WizardTopNavigation, className)}>
            <Maybe it={currentStepIndex !== 0 && enableNavigation}>
              <LeftArrowIcon
                onClick={() => {
                  const previousStep = steps[currentStepIndex - 1];
                  stepClick(previousStep, push);
                }}
                className={styles.WizardTopNavigationBackButton}
              />
            </Maybe>
            <ul className={styles.WizardTopNavigationStepsList}>
              {steps.map((stepItem, index) => (
                <li
                  className={classes(
                    styles.WizardTopNavigationStep,
                    enableNavigation &&
                      styles.WizardTopNavigationStepEnabledNavigation,
                    getClassName(steps, step, index, stepItem)
                  )}
                  onClick={() => stepClick(stepItem, push)}
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
