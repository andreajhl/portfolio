import classes from "classnames";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

type MailSharePreviewProps = {
  className?: string;
  to: string;
  subject: string;
  children?: ReactNode;
};

function MailSharePreview({
  className = "",
  to = "correo@dominio.com",
  subject,
  children,
}: MailSharePreviewProps) {
  return (
    <div className={classes(styles.MailSharePreview, className)}>
      <div className={styles.ToField}>{to}</div>
      <div className={styles.SubjectField}>{subject}</div>
      <div className={styles.BodyField}>{children}</div>
    </div>
  );
}

export { MailSharePreview };
