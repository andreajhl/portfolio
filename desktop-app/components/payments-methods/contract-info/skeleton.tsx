import { ContractDataFormSkeleton } from "../contract-data-form/skeleton";
import { ContractInfoHeaderSkeleton } from "../contract-info-header/skeleton";
import styles from "./styles.module.scss";

function ContractInfoSkeleton() {
  return (
    <div className={styles.ContractInfo}>
      <header
        className={`${styles.ContractInfoSection} ${styles.ContractInfoHeader}`}
      >
        <ContractInfoHeaderSkeleton />
      </header>
      <div
        className={`${styles.ContractInfoSection} ${styles.ContractInfoData}`}
      >
        <ContractDataFormSkeleton />
      </div>
      <div
        className={`${styles.ContractInfoSection} ${styles.ContractInfoPricing}`}
      >
        {/* <ContractPriceSummary /> */}
      </div>
    </div>
  );
}

export { ContractInfoSkeleton };
