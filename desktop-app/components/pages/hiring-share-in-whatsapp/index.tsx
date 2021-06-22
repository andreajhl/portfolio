import Maybe from "desktop-app/components/common/helpers/maybe";
import PageContainer from "desktop-app/components/layouts/page-container";
import { ShareDetailsForm } from "desktop-app/components/layouts/share-details-form";
import { WhatsappSharePreview } from "desktop-app/components/share-in-whatsapp/whatsapp-share-preview";
import useGetUserContract from "lib/hooks/useGetUserContract";
import { useState } from "react";
import styles from "./styles.module.scss";

function HiringShareInWhatsappPage({ contractReference }) {
  const { contract } = useGetUserContract(contractReference, true);

  const [previewData, setPreviewData] = useState({
    deliveryTo: "",
    deliveryFrom: "",
  });

  return (
    <PageContainer>
      <div className={"container " + styles.Container}>
        <div className={styles.SharePreviewContainer}>
          <WhatsappSharePreview
            deliveryTo={previewData.deliveryTo}
            deliveryFrom={previewData.deliveryFrom}
            contractReference={contractReference}
            videoPosterUrl={
              contract?.mediaPosterUrl || contract?.celebrityData?.avatar
            }
          />
        </div>
        <div className={styles.ShareDetailsFormContainer}>
          <Maybe it={Boolean(contract.reference)}>
            <ShareDetailsForm
              contractData={contract}
              onChange={setPreviewData}
            />
          </Maybe>
        </div>
      </div>
    </PageContainer>
  );
}

export { HiringShareInWhatsappPage };
