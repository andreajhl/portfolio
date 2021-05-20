import classes from "classnames";
import Maybe from "../../common/helpers/maybe";
import { StatusType } from "../../common/helpers/submit-button-text";
import styles from "./styles.module.scss";

type SaveStatusProps = {
  className?: string;
  status?: StatusType;
};

function SaveStatus({ className = "", status }: SaveStatusProps) {
  if (status === "idle") return null;

  return (
    <div className={classes(styles.SaveStatusWrapper, className)}>
      <Maybe
        it={status === "completed"}
        orElse={<i className={classes("fa fa-circle-notch", styles.Spinner)} />}
      >
        <i className={`far fa-check-circle ${styles.SavedIcon}`} />
      </Maybe>
      <span className={styles.SaveStatusText}>
        <Maybe it={status === "completed"} orElse="Guardando cambios...">
          Tus cambios se guardaron hace unos segundos.
        </Maybe>
      </span>
    </div>
  );
}

export { SaveStatus };
