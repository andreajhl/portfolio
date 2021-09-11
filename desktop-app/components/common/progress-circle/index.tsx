import { useState } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type ProgressCircleProps = {
  isDone: boolean;
  onFinish?: () => void;
  width?: number;
  height?: number;
};

function ProgressCircle({
  isDone,
  onFinish = function () {},
  width = 236,
  height = 236,
}: ProgressCircleProps) {
  const [loadingAnimationFinished, setLoadingAnimationFinished] = useState(
    false
  );

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 236 236"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.ProgressCircle}
    >
      <circle cx={118} cy={118} r={116} stroke="#6970c633" strokeWidth={4} />
      <circle
        className={classes(
          styles.ProgressCircleLoadedPortion,
          isDone && loadingAnimationFinished && styles.ProgressCircleDone
        )}
        onAnimationEnd={({ animationName }) => {
          if (animationName === styles.loading) {
            return setLoadingAnimationFinished(true);
          }

          if (animationName === styles.finishAnimation) {
            return onFinish?.();
          }
        }}
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
