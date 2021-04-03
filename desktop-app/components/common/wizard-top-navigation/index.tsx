import styles from "./styles.module.scss";
import { WithWizard } from "react-albus";
import { LeftArrowIcon } from "../icons";
import classes from "classnames";
import Maybe from "../helpers/maybe";

type WizardTopNavigationProps = {
  className?: string;
  enableNavigation?: boolean;
  onNavigationClick?: (any) => void;
};

function WizardTopNavigation({
  className = "",
  enableNavigation = false,
  onNavigationClick = () => {}
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

  function itemClick(stepItem, push) {
    if (!enableNavigation) return;
    push(stepItem.id);
    // topNavigationClick(stepItem, push);
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
                  const previousStepId = steps[currentStepIndex - 1]?.id;
                  push(previousStepId);
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
                  onClick={() => itemClick(stepItem, push)}
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
