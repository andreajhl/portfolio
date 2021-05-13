import PageContainer from "desktop-app/components/layouts/page-container";
import { ShareDetailsForm } from "desktop-app/components/layouts/share-details-form";
import { WhatsappSharePreview } from "desktop-app/components/share-in-whatsapp/whatsapp-share-preview";
import styles from "./styles.module.scss";

const HiringShareInWhatsappPage = () => {
  return (
    <PageContainer>
      <div className={"container " + styles.Container}>
        <WhatsappSharePreview
          deliveryTo="Duvan"
          deliveryFrom="German"
          contractReference="202102201838- 7015192-15162"
        />
        <div className={styles.ShareDetailsFormContainer}>
          <ShareDetailsForm />
        </div>
      </div>
    </PageContainer>
  );
};

export { HiringShareInWhatsappPage as HiringSharePage };
