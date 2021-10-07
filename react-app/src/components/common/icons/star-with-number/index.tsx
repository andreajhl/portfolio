import { ReferralsStarIcon } from "../../../../../../desktop-app/components/common/icons";
import styles from "./styles.module.scss";
import classes from "classnames";
import { CSSProperties } from "react";
import Maybe from "../../helpers/maybe";

type StarWithNumberProps = {
  className?: string;
  size?: CSSProperties["fontSize"];
  color?: CSSProperties["color"];
  count: number;
};

function StarWithNumber({
  className,
  size = 16,
  count,
  color,
}: StarWithNumberProps) {
  return (
    <div
      className={classes(styles.StarWithNumber, className)}
      style={{ fontSize: size }}
    >
      <Maybe it={count > 0}>
        <span className={styles.StarWithNumberCount}>{count}</span>
      </Maybe>
      <ReferralsStarIcon color={color} width="1em" height="1em" />
    </div>
  );
}

export { StarWithNumber };
