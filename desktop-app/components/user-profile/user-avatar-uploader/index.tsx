import { ImagePicker } from "desktop-app/components/common/widgets/image-picker";
import { useState } from "react";
import { AvatarUploaderModal } from "desktop-app/components/common/modals/avatar-uploader-modal";
import Maybe from "desktop-app/components/common/helpers/maybe";
import classes from "classnames";
import styles from "./styles.module.scss";
import { updateUserAvatar } from "react-app/src/state/ducks/session/actions";
import WarningMessage from "desktop-app/components/common/warning-message";
import { Collapse } from "react-bootstrap";

const initialErrorValue = null;

type UserAvatarUploaderProps = {
  currentUserAvatar?: string;
};

function UserAvatarUploader({
  currentUserAvatar = "/assets/img/user-logo.svg",
}: UserAvatarUploaderProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(currentUserAvatar);
  const [error, setError] = useState(initialErrorValue);

  const hasChangedPreview = previewSrc !== currentUserAvatar;

  function resetPreviewSrc() {
    setPreviewSrc(currentUserAvatar);
  }

  function startUploadModal(image: File): void {
    setError(initialErrorValue);
    setPickedImage(URL.createObjectURL(image));
    setModalIsOpen(true);
  }

  async function saveUserAvatar(avatarUrl: string) {
    await updateUserAvatar(avatarUrl);
    setPreviewSrc(avatarUrl);
  }

  async function updateAvatar(avatarUrl: string) {
    try {
      await saveUserAvatar(avatarUrl);
    } catch (error) {
      setError(error.message);
    }
  }

  const hasError = Boolean(error);

  return (
    <>
      <Collapse in={hasError}>
        <div>
          <WarningMessage message={error} className={styles.ErrorMessage} />
        </div>
      </Collapse>
      <ImagePicker
        previewImageSrc={previewSrc}
        previewImageBorderRadius="50%"
        label={
          <Maybe it={hasChangedPreview} orElse="Agregar foto">
            <i className={classes("fa fa-edit", styles.EditButton)} />
          </Maybe>
        }
        showDeleteButton={hasChangedPreview}
        onClickDelete={resetPreviewSrc}
        onPickImage={startUploadModal}
        onInvalidFile={setError}
      />
      <Maybe it={modalIsOpen}>
        <AvatarUploaderModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          initialImageSrc={pickedImage}
          onImageUploaded={updateAvatar}
        />
      </Maybe>
    </>
  );
}

export { UserAvatarUploader };
