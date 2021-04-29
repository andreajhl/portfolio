import classes from "classnames";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

type CheckIconListProps = {
  className?: string;
  title?: string;
  items: string[];
};

function CheckIconList({ className, title = null, items }: CheckIconListProps) {
  return (
    <ul className={classes(styles.CheckIconList, className)}>
      <Maybe it={Boolean(title)}>
        <li className={styles.CheckIconListTitle}>{title}</li>
      </Maybe>
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
