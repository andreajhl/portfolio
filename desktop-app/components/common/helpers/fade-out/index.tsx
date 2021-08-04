import { useEffect, useState } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";
import Maybe from "../maybe";
import { ReactNode } from "react";

type FadeOutProps = {
  children?: ReactNode | ((hide: () => void) => ReactNode);
  isHidden?: boolean;
};

function FadeOut({ children, isHidden = false }: FadeOutProps) {
  const [shouldHide, setShouldHide] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    setShouldHide(isHidden);
  }, [isHidden]);

  function hide() {
    setShouldHide(true);
  }

  function remove({
    propertyName,
  }: React.TransitionEvent<HTMLDivElement>): void {
    if (propertyName !== "opacity") return;
    setIsRemoved(true);
  }

  return (
    <Maybe it={!isRemoved}>
      <div
        className={classes(shouldHide && styles.ShouldHide)}
        onTransitionEnd={remove}
      >
        {typeof children === "function" ? children(hide) : children}
      </div>
    </Maybe>
  );
}

export { FadeOut };
