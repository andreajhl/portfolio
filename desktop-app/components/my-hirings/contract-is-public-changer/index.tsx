import { BooleanRadiosInputs } from "desktop-app/components/common/form/boolean-checkboxes";
import { useState } from "react";
import { updateContractIsPublic } from "react-app/src/state/ducks/contracts/actions";
import classes from "classnames";
import styles from "./styles.module.scss";
import { canEditIsPublic } from "desktop-app/constants/contractStatuses";
import { FormattedMessage } from "react-intl";

type ContractIsPublicChangerProps = {
  className?: string;
  contractStatus: number;
  contractId: number;
  contractIsPublic: boolean;
  contractReference: string;
  celebrityId: number;
};

function ContractIsPublicChanger({
  className = "",
  contractStatus,
  contractId,
  contractIsPublic,
  contractReference,
  celebrityId,
}: ContractIsPublicChangerProps) {
  const [isPublic, setIsPublic] = useState(contractIsPublic);
  const [isLoading, setIsLoading] = useState(false);

  const canEdit = canEditIsPublic(contractStatus);

  function handleIsPublic(newIsPublicValue) {
    if (isLoading || !canEdit) {
      return;
    }
    setIsLoading(true);
    setIsPublic(newIsPublicValue);
    updateContractIsPublic({
      id: contractId,
      reference: contractReference,
      isPublic: newIsPublicValue,
      celebrityId: celebrityId,
    }).then(() => setIsLoading(false));
  }

  return (
    <div className={classes(styles.ContractIsPublicChanger, className)}>
      <span className={styles.ContractIsPublicChangerText}>
        <FormattedMessage defaultMessage="Permitir que este video sea público" />
      </span>
      <BooleanRadiosInputs
        value={isPublic}
        onChange={handleIsPublic}
        containerClass={classes(
          !canEdit && styles.ContractIsPublicChangerNotEditable,
          isLoading && styles.ContractIsPublicChangerIsLoading
        )}
      />
    </div>
  );
}

export { ContractIsPublicChanger };
