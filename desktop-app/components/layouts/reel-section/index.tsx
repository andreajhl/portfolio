import { CSSProperties, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { FixedSizeList, FixedSizeListProps } from "react-window";
import styles from "./styles.module.scss";
import Maybe from "react-app/src/components/common/helpers/maybe";
import DirectionButton, {
  ButtonStyle
} from "desktop-app/components/common/button/direction";

type ReelProps = {
  listClassName?: string;
  buttonsStyle?: ButtonStyle;
} & Omit<FixedSizeListProps, "width">;

function ReelSection({
  height,
  itemSize,
  itemCount,
  itemData,
  children: renderItem,
  listClassName,
  buttonsStyle = { size: 35, top: "50%" }
}: ReelProps) {
  const sectionRef = useRef();
  const listRef = useRef();
  const [sectionWidth, setSectionWidth] = useState(1140);
  const [showLeftScrollButton, setShowLeftScrollButton] = useState(false);
  const [showRightScrollButton, setShowRightScrollButton] = useState(false);

  function updateSectionWidth() {
    if (!sectionRef.current) return;
    if (!sectionRef.current.offsetWidth) return;
    setSectionWidth(sectionRef.current.offsetWidth);
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
    <section className={styles.ReelSection} ref={sectionRef}>
      <Maybe it={showLeftScrollButton}>
        <DirectionButton
          onClick={scrollTo("left")}
          direction="left"
          className={styles.ReelSectionButton}
          style={{ ...buttonsStyle, left: -halfButtonSize }}
        />
      </Maybe>
      <FixedSizeList
        ref={listRef}
        width={sectionWidth}
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
          className={styles.ReelSectionButton}
          style={{ ...buttonsStyle, right: -halfButtonSize }}
        />
      </Maybe>
    </section>
  );
}

export default ReelSection;
