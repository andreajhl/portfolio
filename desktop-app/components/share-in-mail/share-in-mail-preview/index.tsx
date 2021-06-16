import { MailSharePreview } from "../../common/widgets/mail-share-preview";
import styles from "./styles.module.scss";

type ShareInMailPreviewProps = {
  className?: string;
  previewData?: { [key: string]: any };
};

function ShareInMailPreview({
  className = "",
  previewData,
}: ShareInMailPreviewProps) {
  return (
    <MailSharePreview
      className={className}
      to={previewData.deliveryContact}
      subject={`${
        previewData.deliveryFrom || "Alguien"
      } te ha enviado un regalo muy especial.`}
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
        Para ver tu regalo haz clic{" "}
        <span className={styles.TextBold}>aquí</span>.
      </p>
    </MailSharePreview>
  );
}

export { ShareInMailPreview };
