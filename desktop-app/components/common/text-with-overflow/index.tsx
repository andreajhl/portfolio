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
    setHiddenPortionWidthInPx(
      spanRef.current?.scrollWidth - spanRef.current?.offsetWidth + 1 // to give a little of space to garante that nothing is hidden
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
