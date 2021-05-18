import { CustomizeGiftCard } from "../customize-gift-card";
import { ShareGiftDropdownButton } from "../share-gift-dropdown-button";
import classes from "classnames";
import styles from "./styles.module.scss";
import ClientContractType from "desktop-app/types/clientContract";
import { VideoContractFeed } from "desktop-app/components/layouts/video-contract-feed";

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
