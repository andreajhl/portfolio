import { getGiftPreviewPath } from "constants/paths";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

const lineBreak = <br />;

type WhatsappSharePreviewProps = {
  deliveryTo: string;
  deliveryFrom: string;
  contractReference: string;
  videoPosterUrl: string;
};

function WhatsappSharePreview({
  deliveryTo,
  deliveryFrom,
  contractReference,
  videoPosterUrl,
}: WhatsappSharePreviewProps) {
  const giftPreviewLink = `https://www.famosos.com${getGiftPreviewPath(
    contractReference
  )}`;
  return (
    <div className={styles.WhatsappSharePreview}>
      <div className={styles.MessageToast}>
        <img
          className={styles.MessageImg}
          src={videoPosterUrl}
          alt="Poster de video"
        />
        <div className={styles.MessageText}>
          <FormattedMessage
            defaultMessage="¡Hola {deliveryTo}! {lineBreak} Mira el regalo que {deliveryFrom} te ha hecho a través de Famosos.com"
            values={{ deliveryTo, deliveryFrom, lineBreak }}
          />
          <br /> <br />
          <span className={styles.Hyperlink}>{giftPreviewLink}</span>
        </div>
      </div>
    </div>
  );
}

export { WhatsappSharePreview };
