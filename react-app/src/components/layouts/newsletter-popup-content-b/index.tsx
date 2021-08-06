import { NewsletterSubscriptionForm } from "react-app/src/components/containers/newsletter-subscription-form";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import classes from "classnames";

const bigTextSpan = (chunks: string) => (
  <span className={styles.NewsletterPopupContentBBigText}>{chunks}</span>
);

const coupon = (
  <div className={styles.NewsletterPopupContentBCoupon}>
    <div className={styles.NewsletterPopupContentBCouponLabel}>
      <span>
        <FormattedMessage defaultMessage="Cupón" />
      </span>
    </div>
    <div className={styles.NewsletterPopupContentBCouponBody}>
      <p className={styles.NewsletterPopupContentBCouponText}>
        <FormattedMessage
          defaultMessage="<bigTextSpan>10%</bigTextSpan> de descuento."
          values={{ bigTextSpan }}
        />
      </p>
    </div>
  </div>
);

type NewsletterPopupContentBProps = {
  className?: string;
  onCompleted?: () => void;
};

function NewsletterPopupContentB({
  className,
  onCompleted,
}: NewsletterPopupContentBProps) {
  return (
    <div className={classes(styles.NewsletterPopupContentB, className)}>
      <section className={styles.NewsletterPopupContentBSection}>
        <h3 className={styles.Title}>
          <FormattedMessage
            defaultMessage="Suscríbete a nuestro newsletter y entérate de todas nuestras novedades
          y promociones exclusivas"
          />
        </h3>
        <div className={styles.NewsletterPopupContentBCopy}>
          <FormattedMessage
            defaultMessage="Además recibe un: {coupon} en tu primera compra."
            values={{ coupon }}
          />
        </div>
        <NewsletterSubscriptionForm
          onCompleted={onCompleted}
          className={styles.NewsletterPopupContentBForm}
          versionPopup="B"
        />
      </section>
    </div>
  );
}

export { NewsletterPopupContentB };
