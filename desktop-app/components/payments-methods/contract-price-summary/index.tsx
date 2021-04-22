import { connect } from "react-redux";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => ({...state});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type ContractPriceSummaryProps = {} & StateProps & DispatchProps;

function ContractPriceSummary({ ...props }: ContractPriceSummaryProps) {
  return <div className={styles.ContractPriceSummary }></div>;
}

const _ContractPriceSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractPriceSummary);

export { _ContractPriceSummary as ContractPriceSummary };
