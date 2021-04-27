import { ReactNode } from "react";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

type StepItemType = {
  iconAlternativeText: string;
  iconName: string;
  description: ReactNode;
};

type StepsGrayBannerProps = {
  title?: ReactNode;
  steps: StepItemType[];
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

function StepsGrayBanner({ title = null, steps }: StepsGrayBannerProps) {
  return (
    <section className={styles.StepsGrayBanner}>
      <div className="container">
        <Maybe it={typeof title === "string"} orElse={title}>
          <h2 className={styles.StepsGrayBannerTitle}>{title}</h2>
        </Maybe>
        <ul className={styles.StepsGrayBannerStepsList}>
          {steps.map(toListItem)}
        </ul>
      </div>
    </section>
  );
}

export { StepsGrayBanner };
