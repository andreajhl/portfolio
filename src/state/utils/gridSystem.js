export const getTotalColumns = () => {
    try {
        const div = document.querySelector(".scrolling-wrapper");
        const style = getComputedStyle(div);
        const split = style.gridTemplateColumns.split(" ");
        return split.length
    }catch (e) {
        return 6
    }
};
