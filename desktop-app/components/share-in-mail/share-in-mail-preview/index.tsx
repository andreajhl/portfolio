import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { MailSharePreview } from "../../common/widgets/mail-share-preview";
import styles from "./styles.module.scss";

type ShareInMailPreviewProps = {
  className?: string;
  previewData?: { [key: string]: any };
};

const messages = defineMessages({
  deliveryFrom: {
    defaultMessage: "{deliveryFrom} te ha enviado un regalo muy especial",
  },
});

function ShareInMailPreview({
  className = "",
  previewData,
}: ShareInMailPreviewProps) {
  const { formatMessage } = useIntl();
  return (
    <MailSharePreview
      className={className}
      to={previewData.deliveryContact}
      subject={formatMessage(messages.deliveryFrom, {
        deliveryFrom: previewData.deliveryName || "Alguien",
      })}
    >
      <img
        className={styles.Poster}
        src="/assets/img/mail-share-img.png"
        alt="Poster"
      />
      <p className={styles.BodyText}>
        {previewData.sendMessage}
        <br />
        <br />
        <br />
        <FormattedMessage
          defaultMessage="
        Para ver tu regalo haz clic 
        <textBold>aquí</textBold>."
          values={{
            textBold: (chunk) => (
              <span className={styles.TextBold}>{chunk}</span>
            ),
          }}
        />
      </p>
    </MailSharePreview>
  );
}

export { ShareInMailPreview };
