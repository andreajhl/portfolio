import classes from "classnames";
import styles from "./styles.module.scss";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

const infoIcon = (
  <span className={styles.WarrantyAdInfoIcon}>
    <i className="fas fa-info-circle" />
  </span>
);

const messages = defineMessages({
  warrantyLogoAlt: {
    defaultMessage: "Logo de Garantía Famosos",
  },
});

type WarrantyAdProps = {
  celebrityFullName: string;
  className?: string;
};

function WarrantyAd({ celebrityFullName, className = "" }: WarrantyAdProps) {
  const { formatMessage } = useIntl();
  const warrantyLogoAlt = formatMessage(messages.warrantyLogoAlt);

  return (
    <section className={classes(styles.WarrantyAd, className)}>
      <img src="/assets/img/famosos-warranty-icon.png" alt={warrantyLogoAlt} />
      <h3>
        <FormattedMessage defaultMessage="Garantía Famosos" />
      </h3>
      <p className={styles.FirstParagraph}>
        <FormattedMessage
          defaultMessage="Video grabado por {celebrityFullName} 100% personalizado."
          values={{ celebrityFullName }}
        />
        <br />
      </p>
      <p className={styles.LastParagraph}>
        <FormattedMessage
          defaultMessage="Si no recibes tu video en 7 días te reembolsamos el 100% de tu dinero.{infoIcon}"
          values={{ infoIcon }}
        />
      </p>
    </section>
  );
}

export { WarrantyAd };
