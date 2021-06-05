import Maybe from "desktop-app/components/common/helpers/maybe";
import { ShareDetailsForm } from "desktop-app/components/layouts/share-details-form";
import useGetContract from "lib/hooks/useGetContract";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useState } from "react";
import { PageContainer } from "../../layouts/page-container";
import scrollToTop from "../../../../../lib/utils/scrollToTop";
import { WhatsappSharePreview } from "desktop-app/components/share-in-whatsapp/whatsapp-share-preview";

function HiringShareInWhatsappPage({ contractReference }) {
  const { contract } = useGetContract(contractReference);
  const [shareData, setShareData] = useState({
    deliveryTo: "Ana", // Random name
    deliveryFrom: "Luis", // Random name
  });
  const [isEditing, setIsEditing] = useState(true);

  function toggleIsEditing() {
    scrollToTop();
    setIsEditing((isEditing) => !isEditing);
  }

  return (
    <PageContainer showSearch={false}>
      <div className={"container " + styles.Container}>
        <div
          className={classes(
            styles.SharePreviewContainer,
            isEditing && styles.PreviewIsEditing
          )}
        >
          <WhatsappSharePreview
            deliveryTo={shareData.deliveryTo}
            deliveryFrom={shareData.deliveryFrom}
            contractReference={contractReference}
            videoPosterUrl={contract?.celebrityData?.avatar}
          />
          <div className={styles.SharePreviewButtons}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggleIsEditing}
            >
              Seguir editando
            </button>
            <button type="button" className="btn btn-primary">
              Programar envío
            </button>
          </div>
        </div>
        <div
          className={classes(
            styles.ShareDetailsFormContainer,
            !isEditing && styles.FormIsPreviewing
          )}
        >
          <Maybe it={Boolean(contract.reference)}>
            <ShareDetailsForm
              type="whatsapp"
              contractData={contract}
              onPreviewButtonClick={toggleIsEditing}
              onChange={setShareData}
            />
          </Maybe>
        </div>
      </div>
    </PageContainer>
  );
}

export { HiringShareInWhatsappPage };
