import { BooleanRadiosInputs } from "desktop-app/components/common/form/boolean-checkboxes";
import { connect } from "react-redux";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type ContractIsPublicChangerProps = {
  className?: string;
  contractStatus: number;
  contractId: number;
  isPublic: boolean;
} & StateProps &
  DispatchProps;

function ContractIsPublicChanger({
  className = "",
  contractStatus,
  contractId,
  isPublic,
}: ContractIsPublicChangerProps) {
  return (
    <div className={`${styles.ContractIsPublicChanger} ${className}`}>
      <span className={styles.ContractIsPublicChangerText}>
        Permitir que este video sea público
      </span>
      <BooleanRadiosInputs value={isPublic} />
    </div>
  );
}

const _ContractIsPublicChanger = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractIsPublicChanger);

export { _ContractIsPublicChanger as ContractIsPublicChanger };
