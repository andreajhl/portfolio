import roundDecimals from "./roundDecimals";

function getDesiredAspectRatioFloat(desiredAspectRatio) {
  if (typeof desiredAspectRatio === "number") return desiredAspectRatio;
  const [height, width] = desiredAspectRatio.split(":").map(parseFloat);
  return roundDecimals(height / width, 2);
}

const hasDesiredAspectRatio = (
  { naturalHeight, naturalWidth },
  desiredAspectRatio
) => {
  const imagenAspectRatio = roundDecimals(naturalHeight / naturalWidth, 2);
  const desiredAspectRatioFloat = getDesiredAspectRatioFloat(
    desiredAspectRatio
  );

  return imagenAspectRatio === desiredAspectRatioFloat;
};

export default hasDesiredAspectRatio;
