import MyHiringsContract from "desktop-app/types/myHiringsContract";
import useForm from "lib/hooks/useForm";
import { useUpdateHiredContract } from "lib/hooks/useUpdateHiredContract";
import { useRef, useState } from "react";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { MyHiringsCardDetails } from "../my-hirings-card-details";
import { MyHiringsCardNotificationInfo } from "../my-hirings-card-notification-info";

const initialValues = {
  deliveryTo: "",
  deliveryFrom: "",
  instructions: "",
  deliveryContact: "",
  deliveryContactCellphone: "",
  contractType: 0,
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
    onChangeField,
    setFieldValue,
    submitForm,
  } = useForm<InitialValuesType>({
    initialValues: getInitialValuesFromContract(contractData),
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
        onChangeField={onChangeField}
        onSave={submitForm}
      />
      <MyHiringsCardNotificationInfo
        contractData={contractData}
        isEditing={isEditing}
        values={values}
        onChangeField={onChangeField}
        setFieldValue={setFieldValue}
      />
    </>
  );
}

export { MyHiringsCardContractInfo };
