import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

const minimumAnimationDuration = 2;
const pixelsPerSecond = 12;

type TextWithOverflowProps = {
  textClassName?: string;
  text: string;
};

function TextWithOverflow({ textClassName = "", text }: TextWithOverflowProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [hiddenPortionWidthInPx, setHiddenPortionWidthInPx] = useState(
    (text.length - 18) * 8 // almost random number
  );
  const [animationDuration, setAnimationDuration] = useState("2.5s");

  useEffect(() => {
    if (!spanRef.current) return;
    const remainingSpace =
      spanRef.current?.scrollWidth - spanRef.current?.offsetWidth;
    const spaceToGaranteThatNothingIsHidden = 1;
    setHiddenPortionWidthInPx(
      remainingSpace ? remainingSpace + spaceToGaranteThatNothingIsHidden : 0
    );
    const animationDuration = remainingSpace / pixelsPerSecond;
    setAnimationDuration(
      `${
        animationDuration > minimumAnimationDuration
          ? animationDuration
          : minimumAnimationDuration
      }s`
    );
  }, []);

  return (
    <div className={styles.TextWithOverflow}>
      <span
        className={textClassName}
        ref={spanRef}
        style={{
          transform: `translateX(-${hiddenPortionWidthInPx}px)`,
          transitionDuration: animationDuration,
          animationDuration,
          animationDelay: animationDuration,
        }}
      >
        {text}
      </span>
    </div>
  );
}

const parentElementClass = styles.ParentElement;

export { TextWithOverflow, parentElementClass };
