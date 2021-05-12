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
        ¡Hola {deliveryTo}! <br />
        Mira el regalo que {deliveryFrom} te ha hecho a través de Famosos.com{" "}
        <br /> <br />
        <span className={styles.Hyperlink}>
          https://www.famosos.com{getHiringPreviewPath(contractReference)}
        </span>
      </div>
    </div>
  );
}

export { WhatsappSharePreview };
