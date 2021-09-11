import styles from "./styles.module.scss";
import { ContractDeliveryFormSkeleton } from "../contract-delivery-form/skeleton";
import classes from "classnames";

type CreateContractWizardSkeletonProps = {
  className?: string;
};

function CreateContractWizardSkeleton({
  className,
}: CreateContractWizardSkeletonProps) {
  return (
    <div
      className={classes(
        styles.CreateContractWizard,
        styles.CreateContractWizardSkeleton,
        className
      )}
    >
      <ContractDeliveryFormSkeleton />
    </div>
  );
}

export { CreateContractWizardSkeleton };
