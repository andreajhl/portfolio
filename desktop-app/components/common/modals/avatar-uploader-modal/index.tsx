import { FileUploaderModal } from "../file-uploader-modal";
import { forwardRef, useEffect, useState } from "react";
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

  return (
    <FileUploaderModal
      title="Recorta tu foto del perfil"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onFileUploaded={(...params) => {
        setCrop(initialCropValue);
        onImageUploaded(...params);
      }}
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
          onImageLoaded={(image) => {
            image.draggable = false;
            image.className = styles.PreviewImage;
          }}
          imageSrc={initialImageSrc}
          onCropImage={setImageToUpload}
        />
      )}
    </FileUploaderModal>
  );
}

export { AvatarUploaderModal };
