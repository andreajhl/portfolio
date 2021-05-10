import classes from "classnames";
import { ReactNode } from "react";
import { CSSProperties } from "react";
import Maybe from "../../helpers/maybe";
import styles from "./styles.module.scss";

const ONLY_IMAGE_FORMATS = "image/*,image/heif,image/heic";

const restartInput = (input: HTMLInputElement) => (input.value = null);

type ImagePickerProps = {
  id?: string;
  previewImageSrc: string;
  previewImageBorderRadius?: CSSProperties["borderRadius"];
  label?: ReactNode;
  showDeleteButton?: boolean;
  onClickDelete?: () => void;
  onPickImage?: (imageFile: File) => void;
};

function ImagePicker({
  id = "image-picker-input",
  previewImageSrc,
  previewImageBorderRadius = "0",
  label = "Seleccionar imagen",
  showDeleteButton = false,
  onPickImage = function () {},
  onClickDelete = function () {},
}: ImagePickerProps) {
  return (
    <div className={styles.Container}>
      <img
        className={styles.Preview}
        alt="Previsualización"
        style={{ borderRadius: previewImageBorderRadius }}
        src={previewImageSrc}
      />
      <input
        type="file"
        id={id}
        accept={ONLY_IMAGE_FORMATS}
        hidden
        onChange={({ target }) => {
          const pickedImage = target?.files?.[0];
          onPickImage(pickedImage);
          restartInput(target);
        }}
      />
      <label htmlFor={id} className={classes("btn", styles.CTAUploadPhoto)}>
        {label}
      </label>
      <Maybe it={showDeleteButton}>
        <button
          type="button"
          className={classes("btn", styles.DeleteButton)}
          onClick={onClickDelete}
        >
          Eliminar foto
        </button>
      </Maybe>
    </div>
  );
}

export { ImagePicker };
