import classes from "classnames";
import { StatusType } from "lib/hooks/useStatus";
import Collapse from "react-bootstrap/Collapse";
import styles from "./styles.module.scss";

const statusData = {
  idle: {
    icon: null,
    text: null,
  },
  loading: {
    icon: <i className={classes("fa fa-circle-notch", styles.Spinner)} />,
    text: "Guardando cambios...",
  },
  completed: {
    icon: <i className={`far fa-check-circle ${styles.SavedIcon}`} />,
    text: "Tus cambios se guardaron hace unos segundos.",
  },
  rejected: {
    icon: <i className={`fa fa-exclamation-circle ${styles.ErrorIcon}`} />,
    text: "Ha ocurrido un error guardando tus cambios",
  },
};

type SaveStatusProps = {
  className?: string;
  status?: StatusType;
};

function SaveStatus({ className = "", status }: SaveStatusProps) {
  const { icon, text } = statusData[status];
  return (
    <Collapse in={status !== "idle"}>
      <div>
        <div
          className={classes(
            styles.SaveStatusWrapper,
            status === "idle" && styles.Idle,
            status === "rejected" && styles.Rejected,
            className
          )}
        >
          {icon}
          <span className={styles.SaveStatusText}>{text}</span>
        </div>
      </div>
    </Collapse>
  );
}

export { SaveStatus };
