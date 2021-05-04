import { ReactNode, useState } from "react";
import { AnimatedPopup } from "../../animated-popup";
import classes from "classnames";
import styles from "./styles.module.scss";
import { CloseModalButton } from "../../button/close-modal-button";
import Maybe from "../../helpers/maybe";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { StatusType } from "desktop-app/components/common/helpers/submit-button-text";
type FileUploaderModalProps = {
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  title?: ReactNode;
  children: (setFileToUpload: Dispatch<any>) => ReactNode | ReactNode;
  onFileUploaded?: (url: string, file: Blob) => void;
};

// "idle" | "loading" | "completed"
function useUploadFile() {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "rejected" | "completed"
  >("idle");

  async function upload() {
    setStatus("uploading");
    try {
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      setStatus("completed");
    } catch (error) {
      setStatus("rejected");
    }
  }

  return { upload, status };
}

function FileUploaderModal({
  isOpen,
  setIsOpen,
  title = "Subir archivo",
  onFileUploaded = function () {},
  children,
}: FileUploaderModalProps) {
  const { upload, status } = useUploadFile();
  const [fileToUpload, setFileToUpload] = useState(null);

  const closeModal = () => setIsOpen(false);

  function cancelUpload() {
    closeModal();
  }

  async function uploadFile() {
    // sleep 2000ms
    await upload();
    onFileUploaded(URL.createObjectURL(fileToUpload), fileToUpload);
    closeModal();
  }

  const buttonStatus: any = status === "uploading" ? "loading" : status;

  return (
    <AnimatedPopup open={isOpen} modal>
      <div className={styles.Card}>
        <div className={styles.CardHeader}>
          <h2 className={styles.CardTitle}>{title}</h2>
          <CloseModalButton
            variant="light"
            className={styles.CloseButton}
            onClick={closeModal}
          />
        </div>
        <div className={styles.CardBody}>
          <Maybe it={typeof children === "function"} orElse={children}>
            {children?.(setFileToUpload)}
          </Maybe>
        </div>
        <div className={styles.CardFooter}>
          <button
            type="button"
            className={classes("btn", styles.CancelButton)}
            onClick={cancelUpload}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={classes("btn btn-secondary", styles.SaveButton)}
            onClick={uploadFile}
          >
            <SubmitText status={buttonStatus} />
          </button>
        </div>
      </div>
    </AnimatedPopup>
  );
}

export { FileUploaderModal };
