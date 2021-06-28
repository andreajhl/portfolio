import styles from "./styles.module.scss";
import classes from "classnames";

type DiscountPercentageBadgeProps = {
  discountPercentage: number;
  className?: string;
};

function DiscountPercentageBadge({
  discountPercentage,
  className,
}: DiscountPercentageBadgeProps) {
  return (
    <span className={classes(styles.DiscountPercentageBadge, className)}>
      -{discountPercentage * 100}%
    </span>
  );
}

export { DiscountPercentageBadge };
