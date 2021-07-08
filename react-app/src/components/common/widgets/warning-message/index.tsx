import styles from "./styles.module.scss";
import classes from "classnames";

type WarningMessageProps = {
  message: string;
  className?: string;
};

const WarningMessage = ({ message, className = "" }: WarningMessageProps) => {
  return (
    <div className={classes(styles.WarningMessage, className)}>
      <i className={classes("fa fa-exclamation-circle", styles.WarningIcon)} />
      <span>{message}</span>
    </div>
  );
};

export default WarningMessage;
