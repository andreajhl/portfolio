import Collapse, { CollapseProps } from "react-bootstrap/Collapse";
import WarningMessage from "../../warning-message";
import classes from "classnames";
import styles from "./styles.module.scss";

type CollapsibleErrorMessageProps = {
  errorMessage?: string;
  className?: string;
} & Omit<CollapseProps, "children">;

function CollapsibleErrorMessage({
  errorMessage = null,
  className,
  ...collapseProps
}: CollapsibleErrorMessageProps) {
  const hasError = Boolean(errorMessage);

  return (
    <Collapse in={hasError} {...collapseProps}>
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
