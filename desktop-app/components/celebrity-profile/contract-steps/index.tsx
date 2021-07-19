import styles from "./styles.module.scss";
import { CommentAlt, ShoppingBag, SurpriseBox } from "../../common/icons/index";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

const mapStateToProps = ({ celebrities }) => ({
  publicContracts: celebrities.fetchPublicContractsReducer.data.results,
});

type StateProps = ReturnType<typeof mapStateToProps>;

type ContractStepsProps = StateProps;
const ContractSteps = ({ publicContracts }: ContractStepsProps) => {
  const getVariant = (totalContracts) => {
    let variant = "NormalLayout";
    if (
      totalContracts >= 3 ||
      totalContracts === 0 ||
      typeof totalContracts === "undefined"
    ) {
      variant = "FullLayout";
    }
    if (totalContracts === 1) {
      variant = "PartialLayout";
    }
    return variant;
  };
  return (
    <div
      className={styles[`ContractSteps${getVariant(publicContracts?.length)}`]}
    >
      <h2>
        <FormattedMessage defaultMessage="Cómo tener un video personalizado de tu Famoso favorito." />
      </h2>
      <div className={styles.ContractStepsDescription}>
        <div className={styles.ContractStep}>
          <div className={styles.ContractStepTitle}>
            <CommentAlt></CommentAlt>{" "}
            <p>
              <FormattedMessage defaultMessage="Personaliza el mensaje de tu video." />
            </p>
          </div>
          <span>
            <FormattedMessage
              defaultMessage="Especifica la celebración, dedicatoria o motivo del video. Puedes
            contar algunos detalles para que tu video quede lo más especial
            posible."
            />
          </span>
        </div>
        <div className={styles.ContractStep}>
          <div className={styles.ContractStepTitle}>
            <ShoppingBag />{" "}
            <p>
              <FormattedMessage defaultMessage="Completa el proceso de compra." />
            </p>
          </div>
          <span>
            <FormattedMessage
              defaultMessage="Elige el método de pago que prefieras y completa el proceso. Los
            pagos son 100% seguros. ¡En 7 días o menos recibirás tu video!"
            />
          </span>
        </div>
        <div className={styles.ContractStep}>
          <div className={styles.ContractStepTitle}>
            <SurpriseBox />{" "}
            <p>
              <FormattedMessage defaultMessage="¡Disfruta la experiencia!" />
            </p>
          </div>
          <span>
            <FormattedMessage
              defaultMessage="Una vez que tu video esté listo te notificaremos para que corras a
            verlo, descargarlo y compartirlo."
            />
          </span>
        </div>
      </div>
    </div>
  );
};

const _ContractSteps = connect(mapStateToProps)(ContractSteps);

export default ContractSteps;

export { _ContractSteps as ContractSteps };
