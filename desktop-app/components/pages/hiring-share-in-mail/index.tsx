import Maybe from "desktop-app/components/common/helpers/maybe";
import PageContainer from "desktop-app/components/layouts/page-container";
import { ShareDetailsForm } from "desktop-app/components/layouts/share-details-form";
import { ShareInMailPreview } from "desktop-app/components/share-in-mail/share-in-mail-preview";
import useGetUserContract from "lib/hooks/useGetUserContract";
import styles from "./styles.module.scss";
import { useState } from "react";

function HiringShareInMailPage({ contractReference }) {
  const { contract } = useGetUserContract(contractReference);
  const [previewData, setPreviewData] = useState({});

  return (
    <PageContainer>
      <div className={"container " + styles.Container}>
        <ShareInMailPreview
          className={styles.SharePreview}
          previewData={previewData}
        />
        <div className={styles.ShareDetailsFormContainer}>
          <Maybe it={Boolean(contract.reference)}>
            <ShareDetailsForm
              type="mail"
              contractData={contract}
              onChange={setPreviewData}
            />
          </Maybe>
        </div>
      </div>
    </PageContainer>
  );
}

export { HiringShareInMailPage };
