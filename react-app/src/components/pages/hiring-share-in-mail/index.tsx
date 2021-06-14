import Maybe from "desktop-app/components/common/helpers/maybe";
import { ShareDetailsForm } from "desktop-app/components/layouts/share-details-form";
import { ShareInMailPreview } from "desktop-app/components/share-in-mail/share-in-mail-preview";
import useGetUserContract from "lib/hooks/useGetUserContract";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useState } from "react";
import { PageContainer } from "../../layouts/page-container";
import scrollToTop from "../../../../../lib/utils/scrollToTop";

function HiringShareInMailPage({ contractReference }) {
  const { contract } = useGetUserContract(contractReference);
  const [shareData, setShareData] = useState({});
  const [isEditing, setIsEditing] = useState(true);

  function toggleIsEditing() {
    scrollToTop();
    setIsEditing((isEditing) => !isEditing);
  }

  return (
    <PageContainer showSearch={false}>
      <div className={"container " + styles.Container}>
        <div className={classes(isEditing && styles.PreviewIsEditing)}>
          <div className={styles.SharePreviewContainer}>
            <ShareInMailPreview
              className={styles.SharePreview}
              previewData={shareData}
            />
          </div>
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
              type="mail"
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

export { HiringShareInMailPage };
