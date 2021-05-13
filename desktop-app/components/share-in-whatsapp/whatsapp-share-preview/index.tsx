import { getHiringPreviewPath } from "constants/paths";
import styles from "./styles.module.scss";

type WhatsappSharePreviewProps = {
  deliveryTo: string;
  deliveryFrom: string;
  contractReference: string;
};

function WhatsappSharePreview({
  deliveryTo,
  deliveryFrom,
  contractReference,
}: WhatsappSharePreviewProps) {
  return (
    <div className={styles.WhatsappSharePreview}>
      <div className={styles.MessageToast}>
        <img
          className={styles.MessageImg}
          src="https://d3dxo4xx2lwk55.cloudfront.net/videos/609/7310/famosos-videos-personalizados-enriquearce-202011032150-1933443-7310-crf-video-poster480.jpg"
          alt="Poster de video"
        />
        <div className={styles.MessageText}>
          ¡Hola {deliveryTo}! <br />
          Mira el regalo que {deliveryFrom} te ha hecho a través de Famosos.com{" "}
          <br /> <br />
          <span className={styles.Hyperlink}>
            https://www.famosos.com{getHiringPreviewPath(contractReference)}
          </span>
        </div>
      </div>
    </div>
  );
}

export { WhatsappSharePreview };
