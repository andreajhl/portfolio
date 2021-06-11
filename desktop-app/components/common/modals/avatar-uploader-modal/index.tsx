import { FileUploaderModal } from "../file-uploader-modal";
import { useState } from "react";
import {
  Crop,
  ImageCropper,
} from "desktop-app/components/common/widgets/image-cropper";
import styles from "./styles.module.scss";
import { Dispatch, SetStateAction } from "react";

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
  const [crop, setCrop] = useState<Crop>(initialCropValue);

  function finishImageCrop(url: string, file: Blob): void {
    setCrop(initialCropValue);
    onImageUploaded(url, file);
  }

  return (
    <FileUploaderModal
      title="Recorta tu foto del perfil"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onFileUploaded={finishImageCrop}
    >
      {(setImageToUpload) => (
        <ImageCropper
          className={styles.ImageCropper}
          crop={crop}
          onChange={setCrop}
          keepSelection
          circularCrop
          ruleOfThirds
          imageAlt="Previsualización de cortado"
          onImageLoaded={setImageAttributes}
          imageSrc={initialImageSrc}
          onCropImage={setImageToUpload}
        />
      )}
    </FileUploaderModal>
  );
}

export { AvatarUploaderModal };
