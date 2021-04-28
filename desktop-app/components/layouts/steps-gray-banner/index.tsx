import { ReactNode } from "react";
import Maybe from "../../common/helpers/maybe";
import classes from "classnames";
import styles from "./styles.module.scss";
import { GrayBanner } from "desktop-app/components/layouts/gray-banner";

type StepItemType = {
  iconAlternativeText: string;
  iconName: string;
  description: ReactNode;
};

type StepsGrayBannerProps = {
  className?: string;
  title?: ReactNode;
  steps?: StepItemType[];
  direction?: "row" | "column";
  iconSize?: "default" | "medium";
  renderContainer?: boolean;
};

const toListItem = ({ iconAlternativeText, iconName, description }) => (
  <li key={iconAlternativeText} className={styles.StepsGrayBannerStepItem}>
    <figure className={styles.StepsGrayBannerIconContainer}>
      <img
        className={styles[iconName]}
        src={`/assets/img/what-happens-before-banner/${iconName}.svg`}
        alt={iconAlternativeText}
      />
    </figure>
    <p>{description}</p>
  </li>
);

function StepsGrayBanner({
  className = "",
  title = null,
  direction = "row",
  steps = [],
  iconSize = "default",
  renderContainer = true,
}: StepsGrayBannerProps) {
  return (
    <GrayBanner
      as="section"
      className={classes(styles.StepsGrayBanner, className)}
      renderContainer={renderContainer}
    >
      <Maybe it={typeof title === "string"} orElse={title}>
        <h2 className={styles.StepsGrayBannerTitle}>{title}</h2>
      </Maybe>
      <ul
        className={classes(
          styles.StepsGrayBannerStepsList,
          direction === "column"
            ? styles.StepsGrayBannerStepsColumn
            : styles.StepsGrayBannerStepsRow,
          styles[iconSize]
        )}
      >
        {steps?.map?.(toListItem) || null}
      </ul>
    </GrayBanner>
  );
}

export { StepsGrayBanner };
