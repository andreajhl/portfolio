import { ReactNode, useState, Dispatch, SetStateAction } from "react";
import { AnimatedPopup } from "../../animated-popup";
import classes from "classnames";
import styles from "./styles.module.scss";
import { CloseModalButton } from "../../button/close-modal-button";
import Maybe from "../../helpers/maybe";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { getUploadProfileImageLink } from "react-app/src/state/ducks/session/actions";
import WarningMessage from "desktop-app/components/common/warning-message";
import useUploadFile from "./useUploadFile";
import Fade from "react-bootstrap/Fade";
import { FormattedMessage } from "react-intl";

const getErrorMessage = (error: Error) => String(error?.message || error);

type FileUploaderModalProps = {
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  title?: ReactNode;
  children: (setFileToUpload: Dispatch<any>) => ReactNode | ReactNode;
  onFileUploaded?: (url: string, file: Blob) => void;
};

function FileUploaderModal({
  isOpen,
  setIsOpen,
  title = <FormattedMessage defaultMessage="Subir archivo" />,
  onFileUploaded = function () {},
  children,
}: FileUploaderModalProps) {
  const { upload, status, setStatus } = useUploadFile();
  const [error, setError] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function cancelUpload() {
    closeModal();
  }

  async function uploadFileToUrl() {
    setStatus("uploading");
    const { uploadUrl, downloadUrl } = await getUploadProfileImageLink("jpg");
    await upload(uploadUrl, fileToUpload);
    onFileUploaded(downloadUrl, fileToUpload);
    closeModal();
  }

  async function uploadFile() {
    try {
      await uploadFileToUrl();
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }

  const buttonStatus: any = status === "uploading" ? "loading" : status;
  const childrenIsRenderFunction = typeof children === "function";
  const uploadWasRejected = status === "rejected";
  const submitButtonBaseText = uploadWasRejected ? (
    <FormattedMessage defaultMessage="Reintentar" />
  ) : (
    <FormattedMessage defaultMessage="Guardar" />
  );
  const canCancelUpload = status !== "uploading";

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
          <Maybe it={childrenIsRenderFunction} orElse={children}>
            {children?.(setFileToUpload)}
          </Maybe>
        </div>
        <div className={styles.CardFooter}>
          <Fade in={uploadWasRejected}>
            <WarningMessage message={error} className={styles.ErrorMessage} />
          </Fade>
          <div className={styles.FooterButtons}>
            <Maybe it={canCancelUpload}>
              <button
                type="button"
                className={classes("btn", styles.CancelButton)}
                onClick={cancelUpload}
              >
                <FormattedMessage defaultMessage="Cancelar" />
              </button>
            </Maybe>
            <button
              type="button"
              className={classes("btn btn-secondary", styles.SaveButton)}
              onClick={uploadFile}
            >
              <SubmitText
                status={buttonStatus}
                baseText={submitButtonBaseText}
              />
            </button>
          </div>
        </div>
      </div>
    </AnimatedPopup>
  );
}

export { FileUploaderModal };
