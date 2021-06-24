import styles from "./styles.module.scss";
import classes from "classnames";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { getWhatsappMessageToNumberLink } from "lib/utils/getSocialMediaLink";
import { FAMOSOS_PHONE_NUMBER } from "constants/phoneNumbers";

const { whatsappMessage } = defineMessages({
  whatsappMessage: {
    defaultMessage:
      "Me gustaría que {celebrityFullName} me grabe un video para mi negocio.",
  },
});

type WhatsappAdForContractsProps = {
  celebrityFullName: string;
};

function WhatsappAdForContracts({
  celebrityFullName,
}: WhatsappAdForContractsProps) {
  const { formatMessage } = useIntl();
  const message = formatMessage(whatsappMessage, { celebrityFullName });

  const sendWhatsappMessageLink = getWhatsappMessageToNumberLink(
    FAMOSOS_PHONE_NUMBER,
    message
  );

  return (
    <div className={styles.WhatsappAdForContracts}>
      <a href={sendWhatsappMessageLink} target="_blank" rel="noreferrer">
        <img
          alt="Whatsapp Icono"
          width="47px"
          height="51px"
          src="/assets/img/whatsapp-icon.png"
        />
      </a>
      <span>
        <FormattedMessage
          defaultMessage="Te redirigiremos a Whatsapp donde uno de nuestros agentes te atenderá
        para continuar con el proceso."
        />
      </span>
      <a
        href={sendWhatsappMessageLink}
        target="_blank"
        rel="noreferrer"
        className={classes("btn btn-primary", styles.SubmitButton)}
      >
        <FormattedMessage defaultMessage="Continuar" />
      </a>
    </div>
  );
}

export default WhatsappAdForContracts;
