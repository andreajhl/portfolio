export const getElementCharacterWidth = (element) =>
  parseFloat(getComputedStyle(element).fontSize.replace(/\D/g, "")) / 2;

const getElementTotalCharacterByLine = (element) => {
  const elementWidth = element.offsetWidth;
  const elementCharacterWidth = getElementCharacterWidth(element);
  return Math.floor(elementWidth / elementCharacterWidth);
};

export default getElementTotalCharacterByLine;
