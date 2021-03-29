import { celebrityType } from "react-app/src/types/celebrityType";
import { connect } from "react-redux";
import { Wizard, Steps as StepsList, Step } from "react-albus";
import styles from "./styles.module.scss";
import { WizardTopNavigation } from "desktop-app/components/wizard-top-navigation";
import useForm from "lib/hooks/useForm";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CreateContractWizardProps = {
  celebrity: celebrityType;
} & StateProps &
  DispatchProps;

const initialValues = {
  deliveryTo: "",
  deliveryFrom: ""
};

function CreateContractWizard({ celebrity }: CreateContractWizardProps) {
  const form = useForm<typeof initialValues>({
    initialValues,
    onSubmit(values) {
      console.log(values);
    }
  });

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
            <input
              type="text"
              name="deliveryFrom"
              value={form.values.deliveryFrom}
              onChange={form.onChangeField}
            />
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
