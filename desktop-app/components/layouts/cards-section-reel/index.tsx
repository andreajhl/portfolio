import { Link } from "desktop-app/components/common/routing/link";
import { Children, ReactNode } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import Reel, { ReelProps } from "../reel";
import styles from "./styles.module.scss";

type Render = (data: any) => JSX.Element;

type CardsReelSectionProps = ReelProps & {
  showHeader?: boolean;
  title?: ReactNode;
  children: Render;
  gap?: number;
};

const getRenderColumn = (renderFn: Render, gap: number) => ({
  data,
  index,
  style
}) => {
  const currentData = data[index];
  const isLastItem = index >= data.length - 1;
  return (
    <div style={isLastItem ? { ...style, width: style.width - gap } : style}>
      {renderFn(currentData)}
    </div>
  );
};

const OneRemInPixels = 16;

function CardsReelSection({
  showHeader = true,
  title = null,
  children: render,
  gap = OneRemInPixels,
  itemWidth,
  itemHeight,
  ...reelProps
}: CardsReelSectionProps) {
  return (
    <section className={styles.CardsReelSection}>
      <Maybe it={showHeader}>
        <header className={styles.CardsReelSectionHeader}>
          <Maybe it={typeof title === "string"} orElse={title}>
            <h2 className={styles.CardsReelSectionTitle}>{title}</h2>
          </Maybe>
          <Link href="/" className={styles.CardsReelSectionShowMore}>
            Ver más
          </Link>
        </header>
      </Maybe>
      <Reel itemSize={itemWidth + gap} height={itemHeight} {...reelProps}>
        {getRenderColumn(render, gap)}
      </Reel>
    </section>
  );
}

export { CardsReelSection };
