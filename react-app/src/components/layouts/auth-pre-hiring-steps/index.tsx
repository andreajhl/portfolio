import { ReactNode } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";
import { defineMessages, FormattedMessage } from "react-intl";
import useValidatedFormattedMessage from "lib/hooks/useValidatedFormattedMessage";

type AuthPreHiringStepsProps = {
  className?: string;
  firstStep?: ReactNode;
  celebrityFullName?: ReactNode;
};

const defaultValuesMessages = defineMessages({
  firstStep: {
    defaultMessage: "Ingresar"
  },
  celebrityFullName: {
    defaultMessage: "Famoso"
  }
});

function AuthPreHiringSteps({
  className = "",
  firstStep = defaultValuesMessages.firstStep,
  celebrityFullName = defaultValuesMessages.celebrityFullName
}: AuthPreHiringStepsProps) {
  const getValidatedFormattedMessage = useValidatedFormattedMessage();
  return (
    <ol className={classes(styles.AuthPreHiringSteps, className)}>
      <li className={styles.AuthPreHiringStepItem}>
        <span>1. {getValidatedFormattedMessage(firstStep)}</span>
      </li>
      <li className={styles.AuthPreHiringStepItem}>
        <span>
          2.{" "}
          <FormattedMessage
            defaultMessage="Comprar video personalizado de {celebrityFullName}"
            values={{
              celebrityFullName: getValidatedFormattedMessage(celebrityFullName)
            }}
          />
        </span>
      </li>
    </ol>
  );
}

export { AuthPreHiringSteps };
