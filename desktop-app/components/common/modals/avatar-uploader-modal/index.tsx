import { FileUploaderModal } from "../file-uploader-modal";
import { useState } from "react";
import {
  Crop,
  ImageCropper,
} from "desktop-app/components/common/widgets/image-cropper";
import styles from "./styles.module.scss";
import { Dispatch, SetStateAction } from "react";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  fileUploaderModalTitle: {
    defaultMessage: "Recorta tu foto del perfil",
  },
  imageCropperImgAlt: {
    defaultMessage: "Previsualización de cortado",
  },
});

const initialCropValue: Crop = {
  aspect: 1,
  width: 100,
  unit: "%",
};

function setImageAttributes(image: HTMLImageElement): void {
  image.draggable = false;
  image.className = styles.PreviewImage;
}

type AvatarUploaderModalProps = {
  isOpen: boolean;
  initialImageSrc: string;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  onImageUploaded?: (url: string, image: Blob) => void;
};

function AvatarUploaderModal({
  isOpen,
  initialImageSrc,
  onImageUploaded = function () {},
  setIsOpen = function () {},
}: AvatarUploaderModalProps) {
  const { formatMessage } = useIntl();
  const [crop, setCrop] = useState<Crop>(initialCropValue);

  function finishImageCrop(url: string, file: Blob): void {
    setCrop(initialCropValue);
    onImageUploaded(url, file);
  }

  const fileUploaderModalTitle = formatMessage(messages.fileUploaderModalTitle);
  const imageCropperImgAlt = formatMessage(messages.imageCropperImgAlt);

  return (
    <FileUploaderModal
      title={fileUploaderModalTitle}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onFileUploaded={finishImageCrop}
    >
      {(setImageToUpload) => (
        <div className={styles.ImageCropperWrapper}>
          <ImageCropper
            className={styles.ImageCropper}
            crop={crop}
            onChange={setCrop}
            keepSelection
            circularCrop
            ruleOfThirds
            imageAlt={imageCropperImgAlt}
            onImageLoaded={setImageAttributes}
            imageSrc={initialImageSrc}
            onCropImage={setImageToUpload}
          />
        </div>
      )}
    </FileUploaderModal>
  );
}

export { AvatarUploaderModal };
