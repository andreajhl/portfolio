import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { HiringPreviewLeftSide } from "desktop-app/components/hiring-preview/hiring-preview-left-side";
import useGetContract from "lib/hooks/useGetContract";
import { VideoContractFeed } from "desktop-app/components/layouts/video-contract-feed";
import Maybe from "desktop-app/components/common/helpers/maybe";

type HiringPreviewPageProps = {
  contractReference: string;
};

function HiringPreviewPage({ contractReference }: HiringPreviewPageProps) {
  const { contract, status } = useGetContract(contractReference, true);

  return (
    <PageContainer showFooter={false}>
      <div className={classes("container", styles.Container)}>
        <Maybe it={status === "completed"}>
          <div className={styles.LeftSide}>
            <HiringPreviewLeftSide
              celebrityFullName={contract?.celebrityData?.fullName}
              deliveryTo={contract?.deliveryTo}
            />
          </div>
          <VideoContractFeed
            className={styles.RightSide}
            contractData={contract}
          />
        </Maybe>
      </div>
    </PageContainer>
  );
}

export { HiringPreviewPage };
