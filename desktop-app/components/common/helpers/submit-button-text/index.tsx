import styles from "./styles.module.scss";
import { ReactNode } from "react";
import classes from "classnames";

export type StatusType = "idle" | "loading" | "completed" | "rejected";

type SubmitTextProps = {
  baseText?: ReactNode;
  status?: StatusType;
};

function SubmitText({
  baseText = "Guardar",
  status = "idle",
}: SubmitTextProps) {
  let icon = null;

  if (status === "loading")
    icon = <i className={classes("fa fa-circle-notch", styles.Spinner)} />;

  if (status === "completed")
    icon = <i className={classes("fa fa-check", styles.Check)} />;

  return (
    <span className={styles.Wrapper}>
      <span
        className={classes(styles.Text, status === "idle" && styles.TextIdle)}
      >
        {baseText}
      </span>
      {icon}
    </span>
  );
}

export { SubmitText };
