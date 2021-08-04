import { ReactNode, useEffect, useState } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type StickyTopBarProps = {
  children: ReactNode;
  appearancePosition: number;
};

function StickyTopBar({ children, appearancePosition = 0 }: StickyTopBarProps) {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    function updateTopBarVisibility() {
      const scrollPosition = window.pageYOffset || window.scrollY;
      setIsHidden(scrollPosition < appearancePosition);
    }
    updateTopBarVisibility();
    window.addEventListener("scroll", updateTopBarVisibility);
    return () => {
      window.removeEventListener("scroll", updateTopBarVisibility);
    };
  }, [appearancePosition]);

  return (
    <div
      className={classes(
        styles.StickyTopBar,
        isHidden && styles.StickyTopBarIsHidden
      )}
    >
      {children}
    </div>
  );
}

export { StickyTopBar };
