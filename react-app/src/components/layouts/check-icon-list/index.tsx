import classes from "classnames";
import styles from "./styles.module.scss";

type CheckIconListProps = {
  className?: string;
  items: string[];
};

function CheckIconList({ className, items }: CheckIconListProps) {
  return (
    <ul className={classes(styles.CheckIconList, className)}>
      {items.map((itemText) => (
        <li>
          <i className="fas fa-check-circle"></i>
          <span>{itemText}</span>
        </li>
      ))}
    </ul>
  );
}

export { CheckIconList };
