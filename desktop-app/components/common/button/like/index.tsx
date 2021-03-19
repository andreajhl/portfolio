import { useState } from "react";

function noop(event: any) {}

export type LikeButtonProps = {
  isFavorite?: boolean;
  filledImageSource?: string;
  outlinedImageSource?: string;
  className?: string;
  width?: string;
  height?: string;
  onHovering?: typeof noop;
  onClick?: typeof noop;
  alternativeText?: string;
};

const LikeButton = ({
  isFavorite = false,
  filledImageSource = "/assets/img/filled-heart.svg",
  outlinedImageSource = "/assets/img/outlined-heart.svg",
  className = "",
  width = "1rem",
  height = width,
  onHovering = noop,
  onClick = noop,
  alternativeText = `${isFavorite ? "No me" : "Me"} gusta`
}: LikeButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const addIsHovering = () => {
    onHovering();
    setIsHovering(true);
  };

  const removeIsHovering = () => {
    setIsHovering(false);
  };

  return (
    <img
      src={isFavorite !== isHovering ? filledImageSource : outlinedImageSource}
      className={`cursor-pointer ${className}`}
      style={{ width, height }}
      onMouseOver={addIsHovering}
      onMouseLeave={removeIsHovering}
      onClick={onClick}
      alt={alternativeText}
      title={alternativeText}
    />
  );
};

export { LikeButton };
