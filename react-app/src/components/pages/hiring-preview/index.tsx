import classes from "classnames";
import styles from "./styles.module.scss";
import { HiringPreviewLeftSide } from "desktop-app/components/hiring-preview/hiring-preview-left-side";
import useGetContract from "lib/hooks/useGetContract";
import { VideoContractFeed } from "desktop-app/components/layouts/video-contract-feed";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { PageContainer } from "../../layouts/page-container";
import { HiringPreviewCTACard } from "desktop-app/components/hiring-preview/hiring-preview-cta-card";
import { HiringReviewSection } from "desktop-app/components/common/widgets/hiring-review-section";
import { GiftAnimationWrapper } from "desktop-app/components/layouts/gift-animation-wrapper";

type HiringPreviewPageProps = {
  contractReference: string;
};

function HiringPreviewPage({ contractReference }: HiringPreviewPageProps) {
  const { contract, status } = useGetContract(contractReference, true);

  return (
    <PageContainer showFooter={false} showSearch={false}>
      <GiftAnimationWrapper
        deliveryTo={contract.deliveryTo}
        deliveryFrom={contract.deliveryFrom}
      >
        <Maybe it={status === "completed"}>
          <div className={classes("container", styles.Container)}>
            <div className={styles.LeftSide}>
              <HiringPreviewLeftSide
                contractReference={contractReference}
                celebrityFullName={contract?.celebrityData?.fullName}
                deliveryTo={contract?.deliveryTo}
              />
            </div>
            <VideoContractFeed
              className={styles.RightSide}
              contractData={contract}
            />
            <div className={styles.HiringReviewSectionWrapper}>
              <HiringReviewSection contractData={contract} />
            </div>
            <HiringPreviewCTACard
              className={styles.HiringPreviewCTACardMobile}
            />
          </div>
        </Maybe>
      </GiftAnimationWrapper>
    </PageContainer>
  );
}

export { HiringPreviewPage };
