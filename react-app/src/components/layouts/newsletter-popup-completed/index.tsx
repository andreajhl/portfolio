import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import classes from "classnames";

type NewsletterPopupCompletedProps = {
  closeModal: () => void;
};

function NewsletterPopupCompleted({
  closeModal
}: NewsletterPopupCompletedProps) {
  return (
    <section className={styles.NewsletterPopupCompleted}>
      <img
        src="/assets/img/newsletter-sparkles.svg"
        alt="Newsletter subscription success sparkles"
        width="312"
        height="185"
        className={styles.NewsletterSparkles}
      />
      <p className={styles.NewsletterPopupCompletedText}>
        <FormattedMessage defaultMessage="Hemos enviado tu código de descuento a tu correo electrónico." />
      </p>
      <button
        onClick={closeModal}
        type="button"
        className={classes(
          "btn btn-primary",
          styles.NewsletterPopupCompletedButton
        )}
      >
        <FormattedMessage defaultMessage="Cerrar" />
      </button>
    </section>
  );
}

export { NewsletterPopupCompleted };
