import { IconButton } from "desktop-app/components/common/button/icon-button";
import { ContractInstructionsTextarea } from "desktop-app/components/common/form/contract-instructions-textarea";
import { EditingToggleButton } from "desktop-app/components/common/button/editing-toggle-button";
import { ContractDataFormInput } from "desktop-app/components/common/form/contract-data-form-input";
import useForm from "lib/hooks/useForm";
import { useState } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { useUpdateHiredContract } from "lib/hooks/useUpdateHiredContract";
import { analytics } from "react-app/src/state/utils/gtm";
import { defineMessages, useIntl } from "react-intl";

const mapDispatchToProps = {};

type DispatchProps = typeof mapDispatchToProps;

type FormValuesType = {
  deliveryTo: string;
  deliveryFrom: string;
  instructions: string;
};

type ContractDataFormProps = {
  contract_reference;
} & FormValuesType &
  DispatchProps;

const messages = defineMessages({
  labelDeliveryTo: {
    defaultMessage: "Para",
  },
  labelDeliveryFrom: {
    defaultMessage: "De",
  },
});
function ContractDataForm({
  deliveryTo,
  deliveryFrom,
  instructions,
  contract_reference,
}: ContractDataFormProps) {
  const { update } = useUpdateHiredContract();
  const { formatMessage } = useIntl();
  const [isEditing, setIsEditing] = useState(false);
  const { values, onChangeField, submitForm } = useForm<FormValuesType>({
    initialValues: {
      deliveryTo,
      deliveryFrom,
      instructions,
    },
    async onSubmit(data) {
      await update(contract_reference, data);
      analytics.track("CONTRACT_UPDATED", {
        widget: "payments-methods/ContractDataForm",
        contractData: {
          ...data,
          contractReference: contract_reference,
        },
      });
    },
  });

  return (
    <form className={styles.ContractDataForm} method="post">
      <div className={styles.ContractDataFormEditButtonWrapper}>
        <EditingToggleButton
          isEditing={isEditing}
          editButtonColor={"var(--dark)"}
          onClickEdit={() => setIsEditing((isEditing) => !isEditing)}
          onClickSave={() => {
            setIsEditing((isEditing) => !isEditing);
            submitForm();
          }}
        />
      </div>

      <div className={styles.ContractDataFormDeliveryInputs}>
        <ContractDataFormInput
          placeholder="Camila"
          disabled={!isEditing}
          label={formatMessage(messages.labelDeliveryTo)}
          value={values.deliveryTo}
          onChange={(event) => {
            onChangeField(event);
          }}
          name="deliveryTo"
          maxLength={40}
        />
        <Maybe it={deliveryFrom !== ""}>
          <ContractDataFormInput
            placeholder="Marco"
            label={formatMessage(messages.labelDeliveryFrom)}
            value={values.deliveryFrom}
            name="deliveryFrom"
            disabled={!isEditing}
            onChange={(event) => {
              onChangeField(event);
            }}
            maxLength={40}
          />
        </Maybe>
      </div>
      <ContractInstructionsTextarea
        labelClass={styles.ContractDataFormInstructionsLabel}
        id="instructions"
        name="instructions"
        value={values.instructions}
        onChange={(event) => {
          onChangeField(event);
        }}
        disabled={!isEditing}
      />
    </form>
  );
}

const _ContractDataForm = connect(null, mapDispatchToProps)(ContractDataForm);

export { _ContractDataForm as ContractDataForm };
