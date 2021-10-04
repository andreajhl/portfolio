import { ContractDataStar } from "../contract-data-star";
import { ContractInfoHeaderV2 } from "../contract-info-header-v.2";
import styles from "./styles.module.scss";

type ContractInfoProps = {
  celebrityAvatar: string;
  celebrityFullName: string;
  occasion: string;
  star: number;
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
  price,
  star,
  original_price,
  contractReference,
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
        <ContractDataStar
          contractPrice={price}
          original_price={original_price}
          contractReference={contractReference}
          //agregar variable de estrellas
          star={5}
        />
      </div>
    </div>
  );
}

export { ContractInfoV2 };
