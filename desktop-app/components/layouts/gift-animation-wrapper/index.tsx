import { ReactNode } from "react";
import { FadeOut } from "../../common/helpers/fade-out";
import { GiftAnimation } from "../gift-animation";
import styles from "./styles.module.scss";

type GiftAnimationWrapperProps = {
  children: ReactNode;
  deliveryTo: string;
  deliveryFrom: string;
};

function GiftAnimationWrapper({
  children,
  deliveryTo,
  deliveryFrom,
}: GiftAnimationWrapperProps) {
  return (
    <>
      <FadeOut>
        {(hideAnimation) => (
          <GiftAnimation
            onFinished={hideAnimation}
            className={styles.Animation}
            deliveryTo={deliveryTo}
            deliveryFrom={deliveryFrom}
          />
        )}
      </FadeOut>
      {children}
    </>
  );
}

export { GiftAnimationWrapper };
