import Maybe from "desktop-app/components/common/helpers/maybe";
import { ShareDetailsForm } from "desktop-app/components/layouts/share-details-form";
import useGetUserContract from "lib/hooks/useGetUserContract";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useState } from "react";
import { WhatsappSharePreview } from "desktop-app/components/share-in-whatsapp/whatsapp-share-preview";
import PageContainer from "desktop-app/components/layouts/page-container";
import scrollToTop from "lib/utils/scrollToTop";
import { FormattedMessage } from "react-intl";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { saveSendConfiguration } from "react-app/src/state/ducks/contracts/actions";
import objectHasValidValues from "lib/utils/objectHasValidValues";
import usePromise from "lib/hooks/usePromise";

const requestErrorInitialState = null;

function HiringShareInWhatsappPage({ contractReference }) {
  const { contract } = useGetUserContract(contractReference);
  const [shareData, setShareData] = useState({
    deliveryTo: "Ana", // Random name to display while loading
    deliveryFrom: "Luis", // Random name to display while loading
  });
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
            videoPosterUrl={
              contract?.mediaPosterUrl || contract?.celebrityData?.avatar
            }
          />
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
              sendType="whatsapp"
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

export { HiringShareInWhatsappPage };
