import { ContractDataStar } from "../contract-data-star";
import { ContractInfoHeaderV2 } from "../contract-info-header-v.2";
import styles from "./styles.module.scss";

type ContractInfoProps = {
  celebrityAvatar: string;
  celebrityFullName: string;
  occasion: string;
  price: number;
  celebrityDiscountPercentage: number;
  original_price: number;
  priceBeforeCelebrityDiscount: number;
  contractReference: string;
};

function ContractInfoV2({
  celebrityAvatar,
  celebrityFullName,
  occasion,
}: ContractInfoProps) {
  return (
    <div className={styles.ContractInfo}>
      <header
        className={`${styles.ContractInfoSection} ${styles.ContractInfoHeader}`}
      >
        <ContractInfoHeaderV2
          occasion={occasion}
          celebrityAvatar={celebrityAvatar}
          celebrityFullName={celebrityFullName}
        />
      </header>
      <div
        className={`${styles.ContractInfoSection} ${styles.ContractInfoData}`}
      >
        <ContractDataStar />
      </div>
    </div>
  );
}

export { ContractInfoV2 };
