import Maybe from "desktop-app/components/common/helpers/maybe";
import classes from "classnames";
import styles from "./styles.module.scss";
import { HTMLAttributes } from "react";

type GiftAnimationProps = {
  className?: string;
  onFinished?: HTMLAttributes<HTMLVideoElement>["onEnded"];
  deliveryTo: string;
  deliveryFrom: string;
};

const getOnlyFirstWord = (text: any) => String(text).split(" ")?.[0];

function GiftAnimation({
  className = "",
  onFinished = function () {},
  deliveryTo,
  deliveryFrom,
}: GiftAnimationProps) {
  const isForOther = Boolean(deliveryFrom);

  return (
    <div className={classes(styles.GiftAnimation, className)}>
      <video
        className={styles.GiftVideo}
        src="/assets/animations/gift-animation.mp4"
        muted
        autoPlay
        controls={false}
        onEnded={onFinished}
      />
      <Maybe it={Boolean(deliveryTo)}>
        <div className={styles.GiftLabel}>
          <div className={styles.GiftLabelDot}></div>
          <p className={classes(isForOther && styles.IsForOther)}>
            Para: {getOnlyFirstWord(deliveryTo)}
          </p>
          <Maybe it={isForOther}>
            <p>De: {getOnlyFirstWord(deliveryFrom)}</p>
          </Maybe>
        </div>
      </Maybe>
    </div>
  );
}

export { GiftAnimation };
