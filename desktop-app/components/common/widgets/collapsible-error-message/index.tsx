import Collapse from "react-bootstrap/Collapse";
import WarningMessage from "../../warning-message";
import classes from "classnames";
import styles from "./styles.module.scss";

type CollapsibleErrorMessageProps = {
  errorMessage?: string;
  className?: string;
};

function CollapsibleErrorMessage({
  errorMessage = null,
  className,
}: CollapsibleErrorMessageProps) {
  const hasError = Boolean(errorMessage);

  return (
    <Collapse in={hasError}>
      <div>
        <div className={styles.CollapsibleErrorMessage}>
          <WarningMessage
            message={errorMessage}
            className={classes(styles.ErrorMessage, className)}
          />
        </div>
      </div>
    </Collapse>
  );
}

export { CollapsibleErrorMessage };
