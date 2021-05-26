import styles from "./styles.module.scss";
import { useState } from "react";
import { HeartIcon } from "../../icons";
import classes from "classnames";

function noop() {}

export type LikeButtonProps = {
  isFavorite?: boolean;
  filledImageSource?: string;
  outlinedImageSource?: string;
  className?: string;
  isFavoriteClassName?: string;
  width?: string;
  height?: string;
  onHovering?: typeof noop;
  onClick?: (event: any) => void;
  alternativeText?: string;
};

const LikeButton = ({
  isFavorite = false,
  isFavoriteClassName = "",
  // filledImageSource = "/assets/img/filled-heart.svg",
  // outlinedImageSource = "/assets/img/outlined-heart.svg",
  className = "",
  width = "15px",
  height = width,
  onHovering = noop,
  onClick = noop,
  alternativeText = `${isFavorite ? "No me" : "Me"} gusta`,
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
    <HeartIcon
      onClick={onClick}
      style={{ width, height }}
      className={classes(
        styles.LikeButton,
        className,
        isFavorite && classes(styles.LikeButtonIsFavorite, isFavoriteClassName)
      )}
    />
  );

  // return (
  //   <img
  //     src={isFavorite !== isHovering ? filledImageSource : outlinedImageSource}
  //     className={`cursor-pointer ${className}`}
  //     style={{ width, height }}
  //     onMouseOver={addIsHovering}
  //     onMouseLeave={removeIsHovering}
  //     onClick={onClick}
  //     alt={alternativeText}
  //     title={alternativeText}
  //   />
  // );
};

export { LikeButton };
