import { ContractDataFormInput } from "desktop-app/components/contract-data-form-input";
import useForm from "lib/hooks/useForm";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { connect } from "react-redux";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type FormValuesType = {
  deliveryTo: string;
  deliveryFrom: string;
  instructions: string;
};

type ContractDataFormProps = {} & FormValuesType & StateProps & DispatchProps;

function ContractDataForm({
  deliveryTo,
  deliveryFrom,
  instructions
}: ContractDataFormProps) {
  const { values, onChangeField } = useForm<FormValuesType>({
    initialValues: {
      deliveryTo,
      deliveryFrom,
      instructions
    },
    onSubmit() {
      console.log("Enviado");
    }
  });

  console.log(values);

  return (
    <form className={styles.ContractDataForm}>
      <div className={styles.ContractDataFormDeliveryInputs}>
        <ContractDataFormInput
          label="Para"
          value={values.deliveryTo}
          onChange={(event) => {
            console.log(event.target);
            onChangeField(event);
          }}
          name="deliveryTo"
        />
        <Maybe it={deliveryFrom !== ""}>
          <ContractDataFormInput
            label="De"
            value={values.deliveryFrom}
            name="deliveryFrom"
          />
        </Maybe>
      </div>
      <label
        className={styles.ContractDataFormInstructionsLabel}
        htmlFor="instructions"
      >
        Mensaje
      </label>
      <textarea
        className={styles.ContractDataFormInstructionsTextarea}
        name="instructions"
        id="instructions"
        value={values.instructions}
      ></textarea>
    </form>
  );
}

const _ContractDataForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractDataForm);

export { _ContractDataForm as ContractDataForm };
