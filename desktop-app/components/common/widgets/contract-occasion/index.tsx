import { occasionsData } from "react-app/src/constants/options";
import styles from "./styles.module.scss";

type ContractOccasionProps = {
  className?: string;
  occasion?: string;
};

function ContractOccasion({
  className = "",
  occasion = "OTHER",
}: ContractOccasionProps) {
  const occasionKey = occasionsData.hasOwnProperty(occasion)
    ? occasion
    : "OTHER";

  const contractOccasion = occasionsData[occasionKey];

  return (
    <div className={`${styles.ContractOccasion} ${className}`}>
      <div className={styles.ContractOccasionIcon}>
        <img
          src={`/assets/img/occasions/${occasionKey}.svg`}
          alt={contractOccasion.title}
        />
      </div>
      {contractOccasion.title}
    </div>
  );
}

export { ContractOccasion };
