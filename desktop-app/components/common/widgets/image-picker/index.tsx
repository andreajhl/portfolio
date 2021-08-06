import classes from "classnames";
import { ReactNode, CSSProperties } from "react";
import Maybe from "../../helpers/maybe";
import styles from "./styles.module.scss";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

const messages = defineMessages({
  previewImgAlt: {
    defaultMessage: "Previsualización",
  },
  invalidImageFormatError: {
    defaultMessage:
      "Selecciona un archivo de tipo imagen. Ejemplo: SVG, JPG, PNG, etc.",
  },
  invalidImageSizeError: {
    defaultMessage: "Selecciona una imagen de menos de 1 MB.",
  },
});

const ONLY_IMAGE_FORMATS = "image/*,image/heif,image/heic";
const ALLOWED_FILE_TYPE = "image/";
const ALLOWED_FILE_SIZE_IN_MEGABYTES = 1;
const ONE_MEGABYTES_IN_BYTES = 1024 * 1024;

function restartInput(input: HTMLInputElement) {
  input.value = null;
}

function getValidationErrorMessage(file: File) {
  if (!isValidImageFormat(file)) {
    return messages.invalidImageFormatError;
  }
  if (!hasValidSize(file)) {
    return messages.invalidImageSizeError;
  }
  return null;
}

const isValidImageFormat = (file: File) =>
  file?.type?.startsWith(ALLOWED_FILE_TYPE);

const hasValidSize = (file: File) =>
  file.size <= ALLOWED_FILE_SIZE_IN_MEGABYTES * ONE_MEGABYTES_IN_BYTES;

type ImagePickerProps = {
  id?: string;
  previewImageSrc: string;
  previewImageBorderRadius?: CSSProperties["borderRadius"];
  label?: ReactNode;
  showDeleteButton?: boolean;
  onClickDelete?: () => void;
  onPickImage?: (imageFile: File) => void;
  onInvalidFile?: (errorMessage: string) => void;
};

function ImagePicker({
  id = "image-picker-input",
  previewImageSrc,
  previewImageBorderRadius = "0",
  label = <FormattedMessage defaultMessage="Seleccionar imagen" />,
  showDeleteButton = false,
  onPickImage = function () {},
  onClickDelete = function () {},
  onInvalidFile = function () {},
}: ImagePickerProps) {
  const { formatMessage } = useIntl();

  function pickImage({ target }) {
    const pickedImage = target?.files?.[0];
    restartInput(target);
    changePickedImage(pickedImage);
  }

  function changePickedImage(pickedImage: File) {
    const validationErrorMessage = getValidationErrorMessage(pickedImage);
    if (validationErrorMessage) {
      return onInvalidFile(formatMessage(validationErrorMessage));
    }
    onPickImage(pickedImage);
  }

  const previewImgAlt = formatMessage(messages.previewImgAlt);

  return (
    <div className={styles.Container}>
      <img
        className={styles.Preview}
        alt={previewImgAlt}
        style={{ borderRadius: previewImageBorderRadius }}
        src={previewImageSrc}
      />
      <input
        type="file"
        id={id}
        accept={ONLY_IMAGE_FORMATS}
        hidden
        onChange={pickImage}
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
          <FormattedMessage defaultMessage="Eliminar foto" />
        </button>
      </Maybe>
    </div>
  );
}

export { ImagePicker };
