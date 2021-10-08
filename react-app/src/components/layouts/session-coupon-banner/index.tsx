import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import Collapse from "react-bootstrap/Collapse";

type SessionCouponBannerProps = {
  onCollapseEnd?: (node: HTMLElement) => void;
  couponCode: string;
};

function SessionCouponBanner({
  onCollapseEnd,
  couponCode = "",
}: SessionCouponBannerProps) {
  return (
    <Collapse in appear onEntered={onCollapseEnd}>
      <div>
        <div className={styles.SessionCouponBanner}>
          <div className="container h-100">
            <p className={styles.SessionCouponBannerText}>
              <FormattedMessage
                defaultMessage="Te regalamos un descuento en tu compra. Usa el código: {couponCode}"
                values={{ couponCode }}
              />
            </p>
          </div>
        </div>
      </div>
    </Collapse>
  );
}

export { SessionCouponBanner };
