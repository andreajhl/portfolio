import { useRef } from "react";
import ReactCrop, {
  ReactCropProps,
  Crop as ReactCropCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import getCroppedImage from "../../../../../lib/utils/getCroppedImage";

type ImageCropperProps = {
  imageSrc: string;
  src?: string;
  onCropImage?: (imageBlob: Blob) => void;
  onImageLoaded?: (imageElement: HTMLImageElement) => void;
} & Omit<ReactCropProps, "src">;

function ImageCropper({
  onCropImage = function () {},
  src,
  imageSrc = src,
  onImageLoaded = function () {},
  onComplete,
  ...props
}: ImageCropperProps) {
  const imageRef = useRef<HTMLImageElement>();

  async function changeCroppedImage(cropValue, percentCrop) {
    const croppedImage = await getCroppedImage(imageRef.current, cropValue);
    onCropImage?.(croppedImage);
    onComplete?.(cropValue, percentCrop);
  }

  function saveImageElement(imageElement: HTMLImageElement) {
    imageRef.current = imageElement;
    onImageLoaded?.(imageElement);
  }

  return (
    <ReactCrop
      src={imageSrc}
      onImageLoaded={saveImageElement}
      onComplete={changeCroppedImage}
      {...props}
    />
  );
}

export type Crop = ReactCropCrop;

export { ImageCropper };
