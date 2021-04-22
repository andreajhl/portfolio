import { IconButton } from "desktop-app/components/common/button/icon-button";
import { ContractDataFormInput } from "desktop-app/components/payments-methods/contract-data-form-input";
import useForm from "lib/hooks/useForm";
import { useState } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
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

  return (
    <form className={styles.ContractDataForm} method="post">
      <div className={styles.ContractDataFormEditButtonWrapper}>
        <Maybe
          it={isEditing}
          orElse={
            <IconButton
              className={styles.ContractDataFormEditButton}
              onClick={() => {
                setIsEditing((isEditing) => !isEditing);
              }}
            >
              <i className="far fa-edit" />
            </IconButton>
          }
        >
          <button
            className={"btn " + styles.ContractDataFormSaveButton}
            onClick={() => {
              setIsEditing((isEditing) => !isEditing);
            }}
          >
            Guardar
          </button>
        </Maybe>
      </div>

      <div className={styles.ContractDataFormDeliveryInputs}>
        <ContractDataFormInput
          placeholder="Camila"
          disabled={!isEditing}
          label="Para"
          value={values.deliveryTo}
          onChange={(event) => {
            console.log(event.target);
            onChangeField(event);
          }}
          name="deliveryTo"
          maxLength={40}
        />
        <Maybe it={deliveryFrom !== ""}>
          <ContractDataFormInput
            placeholder="Marco"
            label="De"
            value={values.deliveryFrom}
            name="deliveryFrom"
            disabled={!isEditing}
            maxLength={40}
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
        disabled={!isEditing}
      />
    </form>
  );
}

const _ContractDataForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractDataForm);

export { _ContractDataForm as ContractDataForm };
