import { ReactNode } from "react";
import styles from "./styles.module.scss";

type StickyTopBarProps = {
  children: ReactNode;
};

function StickyTopBar({ children }: StickyTopBarProps) {
  return <div className={styles.StickyTopBar}>{children}</div>;
}

export { StickyTopBar };
