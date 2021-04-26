import { BooleanRadiosInputs } from "desktop-app/components/common/form/boolean-checkboxes";
import { useState } from "react";
import { updateContractIsPublic } from "react-app/src/state/ducks/contracts/actions";
import { connect } from "react-redux";
import classes from "classnames";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type ContractIsPublicChangerProps = {
  className?: string;
  contractStatus: number;
  contractId: number;
  contractIsPublic: boolean;
  contractReference: string;
  celebrityId: number;
} & StateProps &
  DispatchProps;

const validStatusesToEditIsPublic = [10, 30, 40];

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

  function handleIsPublic(newIsPublicValue) {
    if (isLoading && validStatusesToEditIsPublic.includes(contractStatus)) {
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
        Permitir que este video sea público
      </span>
      <BooleanRadiosInputs
        value={isPublic}
        onChange={handleIsPublic}
        containerClass={classes(
          isLoading && styles.ContractIsPublicChangerIsLoading
        )}
      />
    </div>
  );
}

const _ContractIsPublicChanger = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractIsPublicChanger);

export { _ContractIsPublicChanger as ContractIsPublicChanger };
