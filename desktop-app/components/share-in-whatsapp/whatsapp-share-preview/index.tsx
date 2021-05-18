import { getGiftPreviewPath, getHiringPreviewPath } from "constants/paths";
import styles from "./styles.module.scss";

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
  return (
    <div className={styles.WhatsappSharePreview}>
      <div className={styles.MessageToast}>
        <img
          className={styles.MessageImg}
          src={videoPosterUrl}
          alt="Poster de video"
        />
        <div className={styles.MessageText}>
          ¡Hola {deliveryTo}! <br />
          Mira el regalo que {deliveryFrom} te ha hecho a través de Famosos.com{" "}
          <br /> <br />
          <span className={styles.Hyperlink}>
            https://www.famosos.com{getGiftPreviewPath(contractReference)}
          </span>
        </div>
      </div>
    </div>
  );
}

export { WhatsappSharePreview };
