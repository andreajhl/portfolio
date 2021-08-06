import classes from "classnames";
import ElementType from "desktop-app/types/elementType";
import { ReactNode } from "react";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

type GrayBannerProps = {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  renderContainer?: boolean;
};

function GrayBanner({
  as: Element = "div",
  className = "",
  children,
  renderContainer = true,
}: GrayBannerProps) {
  return (
    <Element className={classes(styles.GrayBanner, className)}>
      <Maybe it={renderContainer} orElse={children}>
        <div className="container">{children}</div>
      </Maybe>
    </Element>
  );
}

export { GrayBanner };
