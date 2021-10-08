import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import classes from "classnames";

const contactUsLink = (chunks: string) => (
  <a
    rel="noreferrer"
    target="_blank"
    href="https://wa.me/18559107580?text=Hola!! ¿Necesitas ayuda con el proceso del pago?"
  >
    {chunks}
  </a>
);

type PaymentSecureBannerV2Props = {
  className?: string;
};

function PaymentSecureBannerV2({ className }: PaymentSecureBannerV2Props) {
  return (
    <div className={classes(styles.PaymentSecureBannerDiv, className)}>
      <div>
        <img
          className={styles.PaymentSecureBanner}
          src="/assets/img/pago-seguro100.png"
          alt="Pago seguro"
        />
        <p className={styles.DisclaimerTermsAndPolicies}>
          <FormattedMessage
            defaultMessage="Al continuar estás aceptando nuestros Términos y Condiciones y
                nuestra Política de privacidad."
          />
        </p>
      </div>
      <p className={styles.contacto}>
        <FormattedMessage
          defaultMessage="¿No sabes como proceder? <contactUsLink>Contáctanos</contactUsLink>"
          values={{ contactUsLink }}
        />
      </p>
    </div>
  );
}

export { PaymentSecureBannerV2 };
