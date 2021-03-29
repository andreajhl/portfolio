import { celebrityType } from "react-app/src/types/celebrityType";
import { connect } from "react-redux";
import { Wizard, Steps as StepsList, Step } from "react-albus";
import styles from "./styles.module.scss";
import { WizardTopNavigation } from "desktop-app/components/wizard-top-navigation";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CreateContractWizardProps = {
  celebrity: celebrityType;
} & StateProps &
  DispatchProps;

function CreateContractWizard({ celebrity }: CreateContractWizardProps) {
  return (
    <div className={styles.CreateContractWizard}>
      <Wizard>
        <WizardTopNavigation enableNavigation />
        <StepsList>
          <Step id="detalles">
            <h3>
              Video personalizado
              <br /> de {celebrity.fullName}
            </h3>
          </Step>
          <Step id="detalles1">
            <h3>
              Video personalizado1
              <br /> de {celebrity.fullName}
            </h3>
          </Step>
          <Step id="detalles2">
            <h3>
              Video personalizado2
              <br /> de {celebrity.fullName}
            </h3>
          </Step>
        </StepsList>
      </Wizard>
    </div>
  );
}

const _CreateContractWizard = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContractWizard);

export { _CreateContractWizard as CreateContractWizard };
