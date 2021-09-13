function noop() {}

export type LikeButtonProps = {
  isFavorite?: boolean;
  filledImageSource?: string;
  outlinedImageSource?: string;
  className?: string;
  width?: string;
  height?: string;
  onClick?: typeof noop;
  alternativeText?: string;
};

function LikeButton({
  isFavorite = false,
  filledImageSource = "/assets/img/filled-heart.svg",
  outlinedImageSource = "/assets/img/outlined-heart.svg",
  className = "",
  width = "1rem",
  height = width,
  onClick = noop,
  alternativeText = `${isFavorite ? "No me" : "Me"} gusta`,
}: LikeButtonProps) {
  return (
    <img
      src={isFavorite ? filledImageSource : outlinedImageSource}
      className={`like-icon cursor-pointer ${className}`}
      style={{ width, height }}
      onClick={onClick}
      alt={alternativeText}
      title={alternativeText}
    />
  );
}

export { LikeButton };
