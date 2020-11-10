export const getTotalColumns = () => {
  try {
    // const div = document.querySelector(".scrolling-wrapper");
    const div = document.querySelector(
      ".celebrities-results-layout__cards-list"
    );
    const style = getComputedStyle(div);
    const split = style.gridTemplateColumns.split(" ");
    return split.length;
  } catch (e) {
    return 6;
  }
};
