import { NewsletterSubscriptionForm } from "react-app/src/components/containers/newsletter-subscription-form";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import classes from "classnames";

const bigTextSpan = (chunks: string) => (
  <span className={styles.NewsletterPopupBigText}>{chunks}</span>
);

type NewsletterPopupContentAProps = {
  className?: string;
  onCompleted?: () => void;
};

function NewsletterPopupContentA({
  className,
  onCompleted
}: NewsletterPopupContentAProps) {
  return (
    <section className={classes(styles.NewsletterPopupContentA, className)}>
      <div className={styles.NewsletterPopupContentAInfo}>
        <img
          className={styles.NewsletterIllustration}
          src="/assets/img/newsletter-mail.svg"
          alt="Ilustración Newsletter"
          width="209"
          height="208"
        />
        <div>
          <h3 className={styles.NewsletterPopupTitle}>
            <FormattedMessage
              defaultMessage="Suscríbete a nuestro newsletter y entérate de nuestras novedades y
            promociones exclusivas."
            />
          </h3>
          <p className={styles.NewsletterPopupCopy}>
            <FormattedMessage
              defaultMessage="Además recibe un <bigTextSpan>10% DE DCTO.</bigTextSpan> en tu primera compra"
              values={{ bigTextSpan }}
            />
          </p>
        </div>
      </div>
      <NewsletterSubscriptionForm
        className={styles.NewsletterPopupForm}
        onCompleted={onCompleted}
        versionPopup="A"
      />
    </section>
  );
}

export { NewsletterPopupContentA };
