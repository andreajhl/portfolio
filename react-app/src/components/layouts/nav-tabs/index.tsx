import classes from "classnames";
import styles from "./styles.module.scss";
import { ReactNode } from "react";

type NavTabsProps = {
  children?: ReactNode;
  className?: string;
};

function NavTabs({ children, className }: NavTabsProps) {
  return <div className={classes(styles.NavTabs, className)}>{children}</div>;
}

export { NavTabs };
