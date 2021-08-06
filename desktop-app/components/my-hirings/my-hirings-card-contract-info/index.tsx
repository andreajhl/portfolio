import MyHiringsContract from "desktop-app/types/myHiringsContract";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import { useUpdateHiredContract } from "lib/hooks/useUpdateHiredContract";
import { useState } from "react";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { MyHiringsCardDetails } from "../my-hirings-card-details";
import { MyHiringsCardNotificationInfo } from "../my-hirings-card-notification-info";
import {
  getDeliveryContactValidator,
  getDeliveryFromValidator,
  getDeliveryToValidator,
  getInstructionsValidator,
} from "lib/validations/contractData";
import { IntlFormatters, useIntl } from "react-intl";

const initialValues = {
  deliveryTo: "",
  deliveryFrom: "",
  instructions: "",
  deliveryContact: "",
  deliveryContactCellphone: "",
  contractType: 1,
};

function getValidations(
  formatMessage: IntlFormatters["formatMessage"]
): ValidationsType<InitialValuesType> {
  return {
    deliveryTo: getDeliveryToValidator(formatMessage),
    deliveryFrom: getDeliveryFromValidator(formatMessage),
    instructions: getInstructionsValidator(formatMessage),
    deliveryContact: getDeliveryContactValidator(formatMessage),
  };
}

const getInitialValuesFromContract = (contractData: MyHiringsContract) => ({
  ...initialValues,
  ...pickPropertiesFromAObject(contractData, Object.keys(initialValues)),
});

type MyHiringsCardContractInfoProps = {
  contractData: MyHiringsContract;
};

type InitialValuesType = typeof initialValues;

function MyHiringsCardContractInfo({
  contractData,
}: MyHiringsCardContractInfoProps) {
  const { formatMessage } = useIntl();
  const { update } = useUpdateHiredContract();
  const [isEditing, setIsEditing] = useState(false);
  const {
    values,
    errors,
    onChangeField,
    setFieldValue,
    submitForm,
  } = useForm<InitialValuesType>({
    initialValues: getInitialValuesFromContract(contractData),
    validations: getValidations(formatMessage),
    onSubmit(newContractData) {
      setIsEditing(false);
      update(contractData.reference, newContractData);
    },
  });

  return (
    <>
      <MyHiringsCardDetails
        contractData={contractData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        values={values}
        errors={errors}
        onChangeField={onChangeField}
        onSave={submitForm}
      />
      <MyHiringsCardNotificationInfo
        contractData={contractData}
        isEditing={isEditing}
        values={values}
        errors={errors}
        onChangeField={onChangeField}
        setFieldValue={setFieldValue}
      />
    </>
  );
}

export { MyHiringsCardContractInfo };
