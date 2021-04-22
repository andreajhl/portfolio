import { connect } from "react-redux";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type PaymentsMethodsSelectorCardProps = {} & StateProps & DispatchProps;

function PaymentsMethodsSelectorCard({
  ...props
}: PaymentsMethodsSelectorCardProps) {
  return (
    <div className={styles.PaymentsMethodsSelectorCard}>
      <h2>Selecciona un método de pago.</h2>
    </div>
  );
}

const _PaymentsMethodsSelectorCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentsMethodsSelectorCard);

export { _PaymentsMethodsSelectorCard as PaymentsMethodsSelectorCard };
