import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

type TextWithOverflowProps = {
  textClassName?: string;
  text: string;
};

function TextWithOverflow({ textClassName = "", text }: TextWithOverflowProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [hiddenPortionWidthInPx, setHiddenPortionWidthInPx] = useState(
    (text.length - 18) * 8 // almost random number
  );

  useEffect(() => {
    if (!spanRef.current) return;
    const remainingSpace =
      spanRef.current?.scrollWidth - spanRef.current?.offsetWidth;
    const spaceToGaranteThatNothingIsHidden = 1;
    setHiddenPortionWidthInPx(
      remainingSpace ? remainingSpace + spaceToGaranteThatNothingIsHidden : 0
    );
  }, []);

  return (
    <div className={styles.TextWithOverflow}>
      <span
        className={textClassName}
        ref={spanRef}
        style={{
          transform: `translateX(-${hiddenPortionWidthInPx}px)`
        }}
      >
        {text}
      </span>
    </div>
  );
}

const parentElementClass = styles.ParentElement;

export { TextWithOverflow, parentElementClass };
