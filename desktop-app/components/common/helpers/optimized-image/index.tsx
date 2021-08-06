/* eslint-disable jsx-a11y/alt-text */
import React, { useRef } from "react";
import { ImageProps } from "next/image";
import useLoad from "react-app/src/utils/useLoad";

const OptimizedImage = ({
  className,
  placeholderSrc,
  placeholderSize: backgroundSize = "cover",
  ...props
}: ImageProps & {
  placeholderSrc: string;
  placeholderSize?: string;
}) => {
  const imageRef = useRef();
  const [imageIsLoaded, imageOnLoad] = useLoad(imageRef);

  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        backgroundImage: placeholderSrc && `url(${placeholderSrc})`,
        backgroundPosition: "center",
        backgroundSize,
      }}
      className={className}
    >
      <img
        {...props}
        ref={imageRef}
        style={{ objectFit: "cover", opacity: Number(imageIsLoaded) }}
        onLoad={imageOnLoad}
      />
    </div>
  );
};

export default OptimizedImage;
