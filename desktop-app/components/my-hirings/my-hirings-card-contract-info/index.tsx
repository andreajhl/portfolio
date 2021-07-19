import MyHiringsContract from "desktop-app/types/myHiringsContract";
import useForm from "lib/hooks/useForm";
import { useUpdateHiredContract } from "lib/hooks/useUpdateHiredContract";
import { useState } from "react";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { MyHiringsCardDetails } from "../my-hirings-card-details";
import { MyHiringsCardNotificationInfo } from "../my-hirings-card-notification-info";
import isEmail from "validator/lib/isEmail";

const initialValues = {
  deliveryTo: "",
  deliveryFrom: "",
  instructions: "",
  deliveryContact: "",
  deliveryContactCellphone: "",
  contractType: 1,
};

// TODO: validations

const validations = {
  deliveryTo(value: string) {
    if (value.length === 0) return "Debes introducir un nombre";
    if (value.length > 40) {
      return "Debes introducir un máximo de 40 caracteres.";
    }
  },
  deliveryFrom(value: string, { values: { contractType } }) {
    if (contractType !== 2) return;
    if (value.length === 0) return "Debes introducir un nombre";
    if (value.length > 40) {
      return "Debes introducir un máximo de 40 caracteres.";
    }
  },
  instructions(value: string) {
    if (value.length === 0) return "Debes escribir tus instrucciones.";
    if (value.length > 300) {
      return "Debes introducir un máximo de 300 caracteres.";
    }
  },
  deliveryContact(value: string) {
    if (!isEmail(value)) return "Ingresa un correo electrónico válido.";
  },
};

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
    validations,
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
