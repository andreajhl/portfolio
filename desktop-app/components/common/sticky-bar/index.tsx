import { ReactNode, useEffect, useState } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type AppearancePositionType =
  | number
  | {
      lessThan: number;
      greaterThan: number;
    };

function calculateIsHidden(appearancePosition: AppearancePositionType) {
  const scrollPosition = window.pageYOffset || window.scrollY;

  if (typeof appearancePosition === "number") {
    return scrollPosition < appearancePosition;
  }

  const { lessThan, greaterThan } = appearancePosition;

  return scrollPosition > lessThan && scrollPosition < greaterThan;
}

export type StickyTopBarProps = {
  children: ReactNode;
  appearancePosition: AppearancePositionType;
  position?: "top" | "bottom";
};

function StickyBar({
  children,
  appearancePosition = 0,
  position = "top",
}: StickyTopBarProps) {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    function updateTopBarVisibility() {
      setIsHidden(calculateIsHidden(appearancePosition));
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
        isHidden && styles.StickyTopBarIsHidden,
        position !== "top" && styles.StickyBottomBar
      )}
    >
      {children}
    </div>
  );
}

export { StickyBar };
