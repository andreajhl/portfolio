import { useState, useRef, useEffect } from "react";
import hasDesiredAspectRatio from "./hasDesiredAspectRatio";
import useLoad from "./useLoad";

const useImageHasDesiredAspectRatio = ({
  passedImageRef,
  desiredAspectRatio = 1
}) => {
  const alternativeImageRef = useRef();
  const imageRef = passedImageRef || alternativeImageRef;
  const [imageIsLoaded, onImageLoad] = useLoad(false);
  const [imageHasDesiredAspectRatio, setImagenHasDesiredAspectRatio] = useState(
    false
  );

  useEffect(() => {
    imageRef.current.addEventListener("load", onImageLoad);
  }, []);

  useEffect(() => {
    if (!imageIsLoaded) return;
    setImagenHasDesiredAspectRatio(
      hasDesiredAspectRatio(imageRef.current, desiredAspectRatio)
    );
  }, [imageIsLoaded]);

  return [imageRef, imageHasDesiredAspectRatio];
};

export default useImageHasDesiredAspectRatio;
