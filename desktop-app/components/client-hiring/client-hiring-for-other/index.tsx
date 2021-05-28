import { CustomizeGiftCard } from "../customize-gift-card";
import { ShareGiftDropdownButton } from "../share-gift-dropdown-button";
import classes from "classnames";
import styles from "./styles.module.scss";
import ClientContractType from "desktop-app/types/clientContract";
import { VideoContractFeed } from "desktop-app/components/layouts/video-contract-feed";
import { HiringReviewSection } from "desktop-app/components/common/widgets/hiring-review-section";
import { GoToContractDetailsButton } from "desktop-app/components/common/button/go-to-contract-details-button";

type ClientHiringForOtherProps = {
  contractData: ClientContractType;
};

function ClientHiringForOther({ contractData }: ClientHiringForOtherProps) {
  return (
    <div className={classes("container", styles.Container)}>
      <div className={styles.LeftSide}>
        <CustomizeGiftCard
          contractReference={contractData.reference}
          deliveryTo={contractData.deliveryTo}
        />
        <ShareGiftDropdownButton
          className={styles.DeliverVideoCard}
          deliveryTo={contractData.deliveryTo}
          deliveryFrom={contractData.deliveryFrom}
          contractReference={contractData.reference}
        />
        <GoToContractDetailsButton
          className={styles.GoToContractDetailsButton}
        />
        <div className={styles.ReviewSectionWrapper}>
          <HiringReviewSection contractData={contractData} asContractOwner />
        </div>
      </div>
      <VideoContractFeed
        className={styles.RightSide}
        contractData={contractData}
        asContractOwner
      />
    </div>
  );
}

export { ClientHiringForOther };
