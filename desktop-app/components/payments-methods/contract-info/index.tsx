import { ContractInfoHeader } from "desktop-app/components/payments-methods/contract-info-header";
import { ContractPriceSummary } from "desktop-app/components/payments-methods/contract-price-summary";
import { ContractDataForm } from "desktop-app/components/payments-methods/contract-data-form";
import styles from "./styles.module.scss";

type ContractInfoProps = {
  celebrityAvatar: string;
  celebrityFullName: string;
  occasion: string;
  deliveryTo: string;
  deliveryFrom: string;
  instructions: string;
  price: number;
  celebrityDiscountPercentage: number;
  original_price: number;
  priceBeforeCelebrityDiscount: number;
  contract_reference;
};

function ContractInfo({
  celebrityAvatar,
  celebrityFullName,
  occasion,
  deliveryTo,
  deliveryFrom,
  instructions,
  price,
  original_price,
  contract_reference,
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
          contract_reference={contract_reference}
          deliveryFrom={deliveryFrom}
          instructions={instructions}
        />
      </div>
      <div
        className={`${styles.ContractInfoSection} ${styles.ContractInfoPricing}`}
      >
        <ContractPriceSummary />
      </div>
    </div>
  );
}

export { ContractInfo };
