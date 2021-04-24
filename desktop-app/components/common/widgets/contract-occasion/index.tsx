import { occasionsData } from "react-app/src/constants/options";
import styles from "./styles.module.scss";

type ContractOccasionProps = {
  className?: string;
  occasion?: string;
};

function ContractOccasion({ className = "", occasion }: ContractOccasionProps) {
  const occasionKey = occasion || "OTHER";
  const contractOccasion = occasionsData[occasionKey] || occasionsData.OTHER;

  return (
    <div className={`${styles.ContractOccasion} ${className}`}>
      <div className={styles.ContractOccasionIcon}>
        <img
          src={`/assets/img/occasions/${occasionKey}.png`}
          alt={contractOccasion.title}
        />
      </div>
      {contractOccasion.title}
    </div>
  );
}

export { ContractOccasion };
