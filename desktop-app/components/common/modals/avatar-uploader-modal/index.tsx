import { FileUploaderModal } from "../file-uploader-modal";
import { useState } from "react";
import {
  Crop,
  ImageCropper,
} from "desktop-app/components/common/widgets/image-cropper";
import styles from "./styles.module.scss";

const initialCropValue: Crop = {
  aspect: 1,
  width: 100,
  unit: "%",
};

type AvatarUploaderModalProps = {
  isOpen: boolean;
  initialImageSrc: string;
};

function AvatarUploaderModal({
  isOpen,
  initialImageSrc,
}: AvatarUploaderModalProps) {
  const [crop, setCrop] = useState<Crop>(initialCropValue);
  const [image, setImage] = useState(null);

  return (
    <FileUploaderModal isOpen={isOpen}>
      <ImageCropper
        className={styles.ImageCropper}
        crop={crop}
        onChange={setCrop}
        circularCrop
        ruleOfThirds
        locked={false}
        imageSrc={initialImageSrc}
        onCropImage={setImage}
      />
    </FileUploaderModal>
  );
}

export { AvatarUploaderModal };
