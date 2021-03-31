import { WarningIcon } from "../icons";
import styles from "./styles.module.scss";

type WarningMessageProps = {
  message: string;
  className?: string;
};

const WarningMessage = ({ message, className = "" }: WarningMessageProps) => {
  return (
    <div className={`${styles.WarningMessage} ${className}`}>
      <WarningIcon />
      <span>{message}</span>
    </div>
  );
};

export default WarningMessage;
