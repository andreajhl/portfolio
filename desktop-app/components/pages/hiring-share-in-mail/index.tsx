import Maybe from "desktop-app/components/common/helpers/maybe";
import { ShareDetailsForm } from "desktop-app/components/layouts/share-details-form";
import { ShareInMailPreview } from "desktop-app/components/share-in-mail/share-in-mail-preview";
import useGetUserContract from "lib/hooks/useGetUserContract";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useState } from "react";
import scrollToTop from "lib/utils/scrollToTop";
import PageContainer from "desktop-app/components/layouts/page-container";
import usePromise from "lib/hooks/usePromise";
import { saveSendConfiguration } from "react-app/src/state/ducks/contracts/actions";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { FormattedMessage } from "react-intl";
import objectHasValidValues from "../../../../lib/utils/objectHasValidValues";

const requestErrorInitialState = null;

function HiringShareInMailPage({ contractReference }) {
  const { contract } = useGetUserContract(contractReference);
  const [shareData, setShareData] = useState({});
  const [isEditing, setIsEditing] = useState(true);
  const [requestError, setRequestError] = useState(requestErrorInitialState);
  const { handle, status, setStatus } = usePromise();
  const [formHasErrors, setFormHasErrors] = useState(false);

  function toggleIsEditing() {
    scrollToTop();
    setIsEditing((isEditing) => !isEditing);
  }

  function activeIsEditing() {
    if (isEditing) return;
    toggleIsEditing();
  }

  const isLoading = status === "loading";

  async function submitSendConfiguration() {
    if (isLoading) return;
    if (formHasErrors) return activeIsEditing();
    setRequestError(requestErrorInitialState);
    try {
      handle(saveSendConfiguration(shareData) as any);
    } catch (error) {
      setStatus("idle");
      setRequestError(error?.message);
    }
  }

  function changeFormHasErrors(errors) {
    setFormHasErrors(objectHasValidValues(errors));
  }

  return (
    <PageContainer showSearchInMobile={false}>
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
              <FormattedMessage defaultMessage="Seguir editando" />
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitSendConfiguration}
            >
              <SubmitText
                baseText={<FormattedMessage defaultMessage="Programar envío" />}
                status={status}
              />
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
              onSubmit={submitSendConfiguration}
              sendType="mail"
              contractData={contract}
              onPreviewButtonClick={toggleIsEditing}
              onChange={setShareData}
              status={status}
              requestError={requestError}
              onError={changeFormHasErrors}
            />
          </Maybe>
        </div>
      </div>
    </PageContainer>
  );
}

export { HiringShareInMailPage };
