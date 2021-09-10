export const calculateElementEdge = (
  element: string | any,
  edge?: "bottom"
) => {
  if (typeof element === "string") element = document.querySelector(element);
  if (!edge || edge === "bottom") {
    return element?.offsetTop + element?.offsetHeight;
  }
};
