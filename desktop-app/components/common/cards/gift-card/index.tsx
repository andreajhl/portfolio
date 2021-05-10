import { ReactNode } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";
import { getOccasion } from "constants/occasions";

type GiftCardProps = {
  className?: string;
  occasion?: string;
  children?: ReactNode;
};

function Title({ children }) {
  return <h2 className={styles.Title}>{children}</h2>;
}

function SpecialText({ children }) {
  return <p className={styles.SpecialText}>{children}</p>;
}

function GiftCard({
  occasion = "OTHER",
  className = "",
  children,
}: GiftCardProps) {
  const [occasionKey, occasionData] = getOccasion(occasion);
  return (
    <section className={classes(styles.GiftCard, className)}>
      <div className={styles.Occasion}>
        <img
          src={`/assets/img/occasions/${occasionKey}.svg`}
          alt={occasionData.title}
        />
      </div>
      {children}
    </section>
  );
}

GiftCard.Title = Title;
GiftCard.SpecialText = SpecialText;

export { GiftCard };
