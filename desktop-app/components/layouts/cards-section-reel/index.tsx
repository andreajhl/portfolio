import { CSSProperties, ReactNode } from "react";
import classes from "classnames";
import { Link } from "desktop-app/components/common/routing/link";
import Maybe from "react-app/src/components/common/helpers/maybe";
import Reel, { ReelProps } from "../reel";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";

type Render = (data: any) => JSX.Element;

export type CardsReelSectionProps = Omit<
  ReelProps,
  "itemData" | "itemSize" | "height" | "children"
> & {
  showHeader?: boolean;
  title?: ReactNode;
  showMorePath?: string;
  children: Render;
  className?: string;
  itemWidth: number;
  itemHeight: number | string;
  itemData: any[];
  gap?: number;
  sidesPadding?: CSSProperties["width"];
};

const getRenderColumn = (
  renderFn: Render,
  gap: number,
  sidesPadding: CSSProperties["width"]
) => ({ data, index, style }) => {
  const currentData = data[index];
  const isLastItem = index === data.length - 1;
  const sidesPaddingWithUnit =
    typeof sidesPadding === "number" ? `${sidesPadding}px` : sidesPadding;
  const additionalWidth = isLastItem ? sidesPaddingWithUnit : 0;
  return (
    <div
      style={{
        ...style,
        width: `calc(${additionalWidth} + ${style.width}px)`,
        left: `calc(${sidesPaddingWithUnit} + ${style.left + gap * index}px)`,
      }}
    >
      {renderFn(currentData)}
    </div>
  );
};

const OneRemInPixels = 16;

function CardsReelSection({
  showHeader = true,
  title = null,
  showMorePath,
  children: render,
  gap = OneRemInPixels,
  className = "",
  itemWidth,
  itemHeight,
  sidesPadding = 0,
  ...reelProps
}: CardsReelSectionProps) {
  return (
    <section className={classes(styles.CardsReelSection, className)}>
      <Maybe it={showHeader}>
        <header className={styles.CardsReelSectionHeader}>
          <Maybe it={typeof title === "string"} orElse={title}>
            <h2>{title}</h2>
          </Maybe>
          <Maybe it={Boolean(showMorePath)}>
            <Link
              href={showMorePath}
              className={styles.CardsReelSectionShowMore}
            >
              <FormattedMessage defaultMessage="Ver más" />
            </Link>
          </Maybe>
        </header>
      </Maybe>
      <Reel
        itemSize={itemWidth}
        height={itemHeight}
        scrollByOffset={gap}
        {...reelProps}
      >
        {getRenderColumn(render, gap, sidesPadding)}
      </Reel>
    </section>
  );
}

export { CardsReelSection };
