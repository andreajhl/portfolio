import PageContainer from "desktop-app/components/layouts/page-container";
import { ShareDetailsForm } from "desktop-app/components/layouts/share-details-form";
import { MailSharePreview } from "desktop-app/components/mail-share-preview";
import styles from "./styles.module.scss";

const HiringShareInMailPage = () => {
  // conectar con endpoint
  return (
    <PageContainer>
      <div className={"container " + styles.Container}>
        <MailSharePreview
          className={styles.SharePreview}
          to="erikadiaz.dcg@gmail.com"
          subject="Luis te ha enviado un regalo muy especial."
        >
          <img
            className={styles.Poster}
            src="/assets/img/mail-share-img.png"
            alt="Poster"
          />
          <p className={styles.BodyText}>
            ¡Hola Ana! <br />
            <br /> Tu mensaje va aquí.
            <br />
            <br /> Atte: Luis <br />
            <br />
            <br /> Para ver tu regalo haz clic aquí.
          </p>
        </MailSharePreview>
        <div className={styles.ShareDetailsFormContainer}>
          <ShareDetailsForm type="mail" />
        </div>
      </div>
    </PageContainer>
  );
};

export { HiringShareInMailPage };
