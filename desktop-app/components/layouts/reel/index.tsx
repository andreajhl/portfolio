import { useRef } from "react";
import { FixedSizeList, FixedSizeListProps } from "react-window";
import styles from "./styles.module.scss";
import Maybe from "react-app/src/components/common/helpers/maybe";
import DirectionButton, {
  ButtonStyle,
} from "desktop-app/components/common/button/direction";
import useElementWidth from "../../../../lib/hooks/useElementWidth";
import useScrollAvailability from "../../../../lib/hooks/useScrollAvailability";
import { CopyWithPartial } from "react-app/src/state/utils/CopyWithPartial";

export type ReelProps = {
  listClassName?: string;
  buttonsStyle?: ButtonStyle;
  scrollByOffset?: number;
} & CopyWithPartial<FixedSizeListProps, "width">;

const defaultContainerWidthOnDesktop = 1134;

function Reel({
  height,
  itemSize,
  itemCount,
  itemData,
  children: renderItem,
  scrollByOffset = 0,
  listClassName,
  buttonsStyle = { size: 35, top: "50%" },
  width = defaultContainerWidthOnDesktop,
}: ReelProps) {
  const containerRef = useRef<HTMLDivElement>();
  const containerWidth = useElementWidth(containerRef, Number(width));
  const listRef = useRef<HTMLDivElement>();
  const [
    setScrollAvailability,
    canScrollLeft,
    canScrollRight,
  ] = useScrollAvailability(listRef, "horizontal");

  const scrollTo = (direction: "right" | "left") => () => {
    const listElement = listRef.current;
    const scrollAmount =
      (itemSize + scrollByOffset) * Math.floor(itemCount / 3);
    const maxScrollAmount = listElement.offsetWidth + scrollByOffset;
    const finalScrollByAmount =
      scrollAmount < maxScrollAmount ? scrollAmount : maxScrollAmount;

    listElement.scrollBy({
      left:
        direction === "right" ? finalScrollByAmount : finalScrollByAmount * -1,
      behavior: "smooth",
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
            left: -halfButtonSize,
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
            right: -halfButtonSize,
          }}
        />
      </Maybe>
    </div>
  );
}

export default Reel;
