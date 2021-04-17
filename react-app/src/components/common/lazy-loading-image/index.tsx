import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const LazyLoadingImage = ({
  className,
  placeholderSrc,
  placeholderSize: backgroundSize = "cover",
  objectFit: string,
  ...props
}: {
  placeholderSrc: string;
  placeholderSize?: string;
  objectFit: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        backgroundImage: placeholderSrc && `url(${placeholderSrc})`,
        backgroundPosition: "center",
        backgroundSize
      }}
      className={className}
    >
      <LazyLoadImage effect="opacity" {...props}></LazyLoadImage>
      <style jsx global>{`
        .lazy-load-image-background {
          opacity: 0;
          transition: 0.6s ease-in-out;
        }
        .lazy-load-image-loaded {
          opacity: 1;
        }
      `}</style>
      ;
    </div>
  );
};

export default LazyLoadingImage;
