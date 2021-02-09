import React from "react";
import Image, { ImageProps } from "next/image";

const OptimizedImage = ({
  className,
  placeholderUrl,
  placeholderSize: backgroundSize = "cover",
  ...props
}: ImageProps & {
  placeholderUrl: string;
  placeholderSize: string;
}) => {
  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        backgroundImage: `url(${placeholderUrl})`,
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
