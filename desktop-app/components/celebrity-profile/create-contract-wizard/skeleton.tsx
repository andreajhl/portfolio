import styles from "./styles.module.scss";
import { ContractDeliveryFormSkeleton } from "../contract-delivery-form/skeleton";

function CreateContractWizardSkeleton() {
  return (
    <div
      className={`${styles.CreateContractWizard} ${styles.CreateContractWizardSkeleton}`}
    >
      <ContractDeliveryFormSkeleton />
    </div>
  );
}

export { CreateContractWizardSkeleton };
