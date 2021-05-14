import { CustomizeGiftCard } from "../customize-gift-card";
import ViewerClientVideo from "../../common/cards/viewer-client-video";
import { DeliverVideoCard } from "../deliver-video-card";
import classes from "classnames";
import styles from "./styles.module.scss";
import ClientContractType from "desktop-app/types/clientContract";
import VideoActionButtons from "desktop-app/components/common/cards/video/action-buttons";
import { ContractReviewVideoForOtherCard } from "desktop-app/components/client-hiring/contract-review-video-for-other-card";
import { ContractVideoPreview } from "desktop-app/components/layouts/contract-video-preview";

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
        <DeliverVideoCard
          className={styles.DeliverVideoCard}
          deliveryTo={contractData.deliveryTo}
        />
      </div>
      <ContractVideoPreview
        className={styles.RightSide}
        contractData={contractData}
      />
    </div>
  );
}

export { ClientHiringForOther };
