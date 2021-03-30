import { WarningIcon } from "../icons";
import styles from "./styles.module.scss";

type WarningMessageProps = {
  message: string;
};
const WarningMessage = ({ message }: WarningMessageProps) => {
  return (
    <div className={styles.WarningMessage}>
      <WarningIcon />
      <span>{message}</span>
    </div>
  );
};

export default WarningMessage;
