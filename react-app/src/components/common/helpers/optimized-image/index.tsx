import React from "react";
import Image, { ImageProps } from "next/image";

const OptimizedImage = ({
  className,
  placeholderSrc,
  placeholderSize: backgroundSize = "cover",
  ...props
}: ImageProps & {
  placeholderSrc: string;
  placeholderSize?: string;
}) => {
  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        backgroundImage: `url(${placeholderSrc})`,
        backgroundPosition: "center",
        backgroundSize
      }}
      className={className}
    >
      <Image {...props} />
    </div>
  );
};

export default OptimizedImage;
