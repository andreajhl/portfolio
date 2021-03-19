import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { FixedSizeList, FixedSizeListProps } from "react-window";
import styles from "./styles.module.scss";
import Maybe from "react-app/src/components/common/helpers/maybe";
import DirectionButton, {
  ButtonStyle
} from "desktop-app/components/common/button/direction";

export type ReelProps = {
  listClassName?: string;
  buttonsStyle?: ButtonStyle;
} & Omit<FixedSizeListProps, "width">;

function Reel({
  height,
  itemSize,
  itemCount,
  itemData,
  children: renderItem,
  listClassName,
  buttonsStyle = { size: 35, top: "50%" }
}: ReelProps) {
  const containerRef = useRef();
  const listRef = useRef();
  const [containerWidth, setContainerWidth] = useState(1140);
  const [showLeftScrollButton, setShowLeftScrollButton] = useState(false);
  const [showRightScrollButton, setShowRightScrollButton] = useState(false);

  function updateSectionWidth() {
    if (!containerRef.current) return;
    if (!containerRef.current.offsetWidth) return;
    setContainerWidth(containerRef.current.offsetWidth);
  }

  useEffect(() => {
    updateSectionWidth();
    const debouncedUpdateSectionWidth = debounce(updateSectionWidth, 500);
    window.addEventListener("resize", debouncedUpdateSectionWidth);
    return () => {
      window.removeEventListener("resize", debouncedUpdateSectionWidth);
    };
  }, []);

  const setScrollButtonsVisibility = debounce(() => {
    const { scrollLeft, offsetWidth, scrollWidth } = listRef.current._outerRef;
    setShowLeftScrollButton(scrollLeft !== 0);
    setShowRightScrollButton(scrollLeft + offsetWidth !== scrollWidth);
  }, 100);

  useEffect(() => {
    const cardListElement = listRef.current._outerRef;
    setShowRightScrollButton(
      cardListElement.scrollWidth > cardListElement.offsetWidth
    );
  }, []);

  const scrollTo = (direction: "right" | "left") => () => {
    const listElement = listRef.current._outerRef;
    const { offsetWidth } = listElement;
    listElement.scrollBy({
      left: direction === "right" ? offsetWidth : offsetWidth * -1,
      behavior: "smooth"
    });
  };

  const halfButtonSize = buttonsStyle.size / 2;

  return (
    <div className={styles.Reel} ref={containerRef}>
      <Maybe it={showLeftScrollButton}>
        <DirectionButton
          onClick={scrollTo("left")}
          direction="left"
          className={styles.ReelButton}
          style={{ ...buttonsStyle, left: -halfButtonSize }}
        />
      </Maybe>
      <FixedSizeList
        ref={listRef}
        width={containerWidth}
        layout="horizontal"
        onScroll={setScrollButtonsVisibility}
        height={height}
        itemCount={itemCount}
        itemData={itemData}
        className={listClassName}
        itemSize={itemSize}
      >
        {renderItem}
      </FixedSizeList>
      <Maybe it={showRightScrollButton}>
        <DirectionButton
          onClick={scrollTo("right")}
          direction="right"
          className={styles.ReelButton}
          style={{ ...buttonsStyle, right: -halfButtonSize }}
        />
      </Maybe>
    </div>
  );
}

export default Reel;
