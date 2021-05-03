function getCanvasFromCropSize(crop: {
  width: number;
  height: number;
  x: number;
  y: number;
}) {
  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  return canvas;
}

function getImageScale(image: HTMLImageElement) {
  const x = image.naturalWidth / image.width;
  const y = image.naturalHeight / image.height;
  return { x, y };
}

function drawImageOnCanvas(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  crop: { width: number; height: number; x: number; y: number },
  imageScale: { x: number; y: number }
) {
  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    image,
    crop.x * imageScale.x,
    crop.y * imageScale.y,
    crop.width * imageScale.x,
    crop.height * imageScale.y,
    0,
    0,
    crop.width,
    crop.height
  );
}

const promisifyToBlob = (canvas: HTMLCanvasElement, ...params) =>
  new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), ...params);
  });

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 */
function getCroppedImage(
  image: HTMLImageElement,
  crop: { width: number; height: number; x: number; y: number }
): Promise<Blob> {
  const canvas = getCanvasFromCropSize(crop);
  const imageScale = getImageScale(image);
  drawImageOnCanvas(canvas, image, crop, imageScale);
  return promisifyToBlob(canvas, "image/jpeg", 1);
}

export default getCroppedImage;
