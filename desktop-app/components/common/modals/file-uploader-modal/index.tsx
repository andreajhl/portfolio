import { ReactNode } from "react";
import { AnimatedPopup } from "../../animated-popup";
import classes from "classnames";
import styles from "./styles.module.scss";
import { CloseModalButton } from "../../button/close-modal-button";

type FileUploaderModalProps = {
  isOpen: boolean;
  title?: ReactNode;
  children: ReactNode;
};

function FileUploaderModal({
  isOpen,
  title = "Subir archivo",
  children,
}: FileUploaderModalProps) {
  return (
    <AnimatedPopup open={isOpen} modal>
      <div className={styles.Card}>
        <div className={styles.CardHeader}>
          <h2 className={styles.CardTitle}>{title}</h2>
          <CloseModalButton className={styles.CloseButton} />
        </div>
        <div className={styles.CardBody}>{children}</div>
        <div className={styles.CardFooter}>
          <button type="button" className={classes("btn", styles.CancelButton)}>
            Cancelar
          </button>
          <button
            type="button"
            className={classes("btn btn-secondary", styles.SaveButton)}
          >
            Guardar
          </button>
        </div>
      </div>
    </AnimatedPopup>
  );
}

export { FileUploaderModal };
