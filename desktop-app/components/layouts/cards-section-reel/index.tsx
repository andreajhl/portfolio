import { ReactNode } from "react";
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
};

const getRenderColumn = (renderFn: Render, gap: number) => ({
  data,
  index,
  style,
}) => {
  const currentData = data[index];
  return (
    <div style={{ ...style, left: style.left + gap * index }}>
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
        {getRenderColumn(render, gap)}
      </Reel>
    </section>
  );
}

export { CardsReelSection };
