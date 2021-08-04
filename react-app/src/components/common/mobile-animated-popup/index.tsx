import { AnimatedPopup } from "desktop-app/components/common/animated-popup";
import React from "react";
import styles from "./styles.module.scss";
type MobileAnimatedPopupProps = {
  children: React.ReactNode;
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element);
};

function MobileAnimatedPopup({ children, trigger }: MobileAnimatedPopupProps) {
  return (
    <AnimatedPopup trigger={trigger} modal>
      {(close) => (
        <div className={styles.MobileAnimatedPopupWrapper}>
          <button
            className={`btn btn-outline ${styles.CloseButton}`}
            onClick={close}
          >
            <i className="fa fa-times"></i>
          </button>
          <div className={styles.MainContent}>{children}</div>
        </div>
      )}
    </AnimatedPopup>
  );
}

export { MobileAnimatedPopup };
