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
  scrollByOffset?: number;
} & Omit<FixedSizeListProps, "width">;

const defaultContainerWidthOnDesktop = 1140;

function Reel({
  height,
  itemSize,
  itemCount,
  itemData,
  children: renderItem,
  scrollByOffset = 0,
  listClassName,
  buttonsStyle = { size: 35, top: "50%" }
}: ReelProps) {
  const containerRef = useRef<HTMLDivElement>();
  const listRef = useRef<HTMLDivElement>();
  const [containerWidth, setContainerWidth] = useState(
    defaultContainerWidthOnDesktop
  );
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
    const { scrollLeft, offsetWidth, scrollWidth } = listRef.current;
    setShowLeftScrollButton(scrollLeft !== 0);
    setShowRightScrollButton(scrollLeft + offsetWidth !== scrollWidth);
  }, 100);

  useEffect(() => {
    const cardListElement = listRef.current;
    setShowRightScrollButton(
      cardListElement.scrollWidth > cardListElement.offsetWidth
    );
  }, []);

  const scrollTo = (direction: "right" | "left") => () => {
    const listElement = listRef.current;
    const offsetWidth = listElement.offsetWidth + scrollByOffset;

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
          style={{
            ...buttonsStyle,
            fontSize: halfButtonSize * 1.3,
            left: -halfButtonSize
          }}
        />
      </Maybe>
      <FixedSizeList
        outerRef={listRef}
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
          style={{
            ...buttonsStyle,
            fontSize: halfButtonSize * 1.3,
            right: -halfButtonSize
          }}
        />
      </Maybe>
    </div>
  );
}

export default Reel;
