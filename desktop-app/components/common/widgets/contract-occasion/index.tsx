import { getOccasion } from "constants/occasions";
import { useIntl } from "lib/custom-intl";
import styles from "./styles.module.scss";

type ContractOccasionProps = {
  className?: string;
  occasion?: string;
};

function ContractOccasion({
  className = "",
  occasion = "OTHER",
}: ContractOccasionProps) {
  const { locale } = useIntl();
  const [occasionKey, contractOccasion] = getOccasion(occasion, locale);

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
