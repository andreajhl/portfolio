import { AnimationEvent, useState } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type ProgressCircleProps = { isDone: boolean; onAnimationFinish?: () => void };

function ProgressCircle({
  isDone,
  onAnimationFinish = function () {}
}: ProgressCircleProps) {
  const [animationFinished, setAnimationFinished] = useState(false);

  function updateAnimationFinished(event: AnimationEvent<SVGCircleElement>) {
    if (event.animationName === styles.doneAnimation) {
      return onAnimationFinish();
    }
    setAnimationFinished(true);
  }

  return (
    <svg
      width={236}
      height={236}
      viewBox="0 0 236 236"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.ProgressCircle}
    >
      <circle cx={118} cy={118} r={116} stroke="#6970c633" strokeWidth={4} />
      <circle
        className={classes(
          styles.ProgressCircleLoadedPortion,
          isDone && animationFinished && styles.ProgressCircleDone
        )}
        onAnimationEnd={updateAnimationFinished}
        cx={118}
        cy={118}
        r={116}
        stroke="#6970C6"
        strokeWidth={4}
      />
      <circle
        cx={118}
        cy={118}
        r={116}
        stroke="url(#prefix__paint0_linear)"
        strokeWidth={4}
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={118}
          y1={0}
          x2={118}
          y2={236}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={0.479} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export { ProgressCircle };
