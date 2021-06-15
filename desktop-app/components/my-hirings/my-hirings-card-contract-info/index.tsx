import MyHiringsContract from "desktop-app/types/myHiringsContract";
import useForm from "lib/hooks/useForm";
import { useState } from "react";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { MyHiringsCardDetails } from "../my-hirings-card-details";
import { MyHiringsCardNotificationInfo } from "../my-hirings-card-notification-info";

const initialValues = {
  deliveryTo: "",
  deliveryFrom: "",
  instructions: "",
  deliveryContact: "",
  deliveryContactCellphone: "",
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
  const [isEditing, setIsEditing] = useState(false);
  const { values, onChangeField } = useForm<InitialValuesType>({
    initialValues: getInitialValuesFromContract(contractData),
  });

  return (
    <>
      <MyHiringsCardDetails
        contractData={contractData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        values={values}
        onChangeField={onChangeField}
      />
      <MyHiringsCardNotificationInfo
        contractData={contractData}
        isEditing={isEditing}
        values={values}
      />
    </>
  );
}

export { MyHiringsCardContractInfo };
