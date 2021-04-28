import classes from "classnames";
import AsComponentType from "desktop-app/types/AsComponentType";
import { ReactNode } from "react";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

type GrayBannerProps = {
  as?: AsComponentType;
  className?: string;
  children?: ReactNode;
  renderContainer?: boolean;
};

function GrayBanner({
  as: As = "div",
  className = "",
  children,
  renderContainer = true,
}: GrayBannerProps) {
  return (
    <As className={classes(styles.GrayBanner, className)}>
      <Maybe it={renderContainer} orElse={children}>
        <div className="container">{children}</div>
      </Maybe>
    </As>
  );
}

export { GrayBanner };
