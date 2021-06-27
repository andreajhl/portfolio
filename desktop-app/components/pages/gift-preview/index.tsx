import PageContainer from "desktop-app/components/layouts/page-container";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import styles from "./styles.module.scss";
import useGetContract from "lib/hooks/useGetContract";
import { GiftPreviewMain } from "desktop-app/components/layouts/gift-preview-main";
import { GiftAnimationWrapper } from "desktop-app/components/layouts/gift-animation-wrapper";
import useGetHiringPreviewConfiguration from "lib/hooks/useGetHiringPreviewConfiguration";
import getDefaultHiringConfiguration from "constants/getDefaultHiringConfiguration";
import getObjectWithFallbackValues from "lib/utils/getObjectWithFallbackValues";
import ClientContractType from "desktop-app/types/clientContract";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { FormattedMessage } from "react-intl";

const opcionalPreviewConfigurationProperties = [
  "pageBackgroundUrl",
  "actionButtonsBackgroundColor",
];

function getPreviewConfigurationWithFallbacks(
  contract: ClientContractType,
  hiringPreviewConfiguration: HiringPreviewConfigurationType
) {
  const defaultPreviewConfiguration = getDefaultHiringConfiguration(contract);
  return getObjectWithFallbackValues(
    hiringPreviewConfiguration,
    defaultPreviewConfiguration,
    opcionalPreviewConfigurationProperties
  );
}

type GiftPreviewPageProps = {
  contractReference: string;
  hiringConfiguration?: HiringPreviewConfigurationType;
  previewMode?: boolean;
};

function GiftPreviewPage({
  contractReference,
  previewMode = false,
}: GiftPreviewPageProps) {
  const { contract, status } = useGetContract(contractReference, true);
  const { hiringPreviewConfiguration } = useGetHiringPreviewConfiguration(
    contractReference
  );

  const previewConfiguration = getPreviewConfigurationWithFallbacks(
    contract,
    hiringPreviewConfiguration
  );

  const contractIsCompleted = status === "completed";

  return (
    <PageContainer showFooter={false}>
      <div className={styles.PageWrapper}>
        <GiftAnimationWrapper
          disableAnimation={previewMode}
          deliveryTo={contract.deliveryTo}
          deliveryFrom={contract.deliveryFrom}
        >
          <Maybe it={previewMode}>
            <div className={` ${styles.PreviewModeOverlay}`}>
              <div className={styles.PreviewModeOverlayBanner}>
                <p>
                  <FormattedMessage defaultMessage="Esta es una previsualización donde las funcionalidades están deshabilitadas" />
                </p>
              </div>
            </div>
          </Maybe>
          <Maybe it={contractIsCompleted}>
            <GiftPreviewMain
              className={styles.HiringPreviewPageMain}
              contract={contract}
              hiringConfiguration={previewConfiguration}
              previewMode={previewMode}
            />
          </Maybe>
        </GiftAnimationWrapper>
      </div>
    </PageContainer>
  );
}

export { GiftPreviewPage };
