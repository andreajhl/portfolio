import { useRef } from "react";
import { FixedSizeList, FixedSizeListProps } from "react-window";
import styles from "./styles.module.scss";
import Maybe from "react-app/src/components/common/helpers/maybe";
import DirectionButton, {
  ButtonStyle
} from "desktop-app/components/common/button/direction";
import useElementWidth from "../../../../lib/hooks/useElementWidth";
import useScrollAvailability from "../../../../lib/hooks/useScrollAvailability";

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
  const containerWidth = useElementWidth(
    containerRef,
    defaultContainerWidthOnDesktop
  );
  const listRef = useRef<HTMLDivElement>();
  const [
    setScrollAvailability,
    canScrollLeft,
    canScrollRight
  ] = useScrollAvailability(listRef, "horizontal");

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
      <Maybe it={canScrollLeft}>
        <DirectionButton
          onClick={scrollTo("left")}
          direction="left"
          className={styles.ReelButton}
          style={{
            ...buttonsStyle,
            fontSize: halfButtonSize * 0.85,
            left: -halfButtonSize
          }}
        />
      </Maybe>
      <FixedSizeList
        outerRef={listRef}
        width={containerWidth}
        layout="horizontal"
        onScroll={setScrollAvailability}
        height={height}
        itemCount={itemCount}
        itemData={itemData}
        className={listClassName}
        itemSize={itemSize}
      >
        {renderItem}
      </FixedSizeList>
      <Maybe it={canScrollRight}>
        <DirectionButton
          onClick={scrollTo("right")}
          direction="right"
          className={styles.ReelButton}
          style={{
            ...buttonsStyle,
            fontSize: halfButtonSize * 0.85,
            right: -halfButtonSize
          }}
        />
      </Maybe>
    </div>
  );
}

export default Reel;
