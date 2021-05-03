import classes from "classnames";
import styles from "./styles.module.scss";

const ONLY_IMAGE_FORMATS = "image/*,image/heif,image/heic";

const restartInput = (input: HTMLInputElement) => (input.value = null);

type ImagePickerProps = {
  id?: string;
  previewImageSrc: string;
  label?: string;
  onPickImage?: (imageFile: File) => void;
};

function ImagePicker({
  id = "image-picker-input",
  previewImageSrc,
  label = "Seleccionar imagen",
  onPickImage = function () {},
}: ImagePickerProps) {
  return (
    <div className={styles.Container}>
      <img
        className={styles.Preview}
        alt="Previsualización"
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
    </div>
  );
}

export { ImagePicker };
