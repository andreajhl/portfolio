import { ContractInfoHeader } from "desktop-app/components/payments-methods/contract-info-header";
import { ContractPriceSummary } from "desktop-app/components/contract-price-summary";
import { ContractDataForm } from "desktop-app/components/payments-methods/contract-data-form";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { occasionsData } from "react-app/src/constants/options";
import styles from "./styles.module.scss";

type ContractInfoProps = {
  celebrityAvatar: string;
  celebrityFullName: string;
  occasion: string;
  deliveryTo: string;
  deliveryFrom: string;
  instructions: string;
};

function ContractInfo({
  celebrityAvatar,
  celebrityFullName,
  occasion,
  deliveryTo,
  deliveryFrom,
  instructions
}: ContractInfoProps) {
  return (
    <div className={styles.ContractInfo}>
      <header
        className={`${styles.ContractInfoSection} ${styles.ContractInfoHeader}`}
      >
        <ContractInfoHeader
          occasion={occasion}
          celebrityAvatar={celebrityAvatar}
          celebrityFullName={celebrityFullName}
        />
      </header>
      <div
        className={`${styles.ContractInfoSection} ${styles.ContractInfoData}`}
      >
        <ContractDataForm
          deliveryTo={deliveryTo}
          deliveryFrom={deliveryFrom || "Prueba Prueba"}
          instructions={instructions}
        />
      </div>
      <div
        className={`${styles.ContractInfoSection} ${styles.ContractInfoPricing}`}
      >
        Total
      </div>
    </div>
  );
}

export { ContractInfo };
