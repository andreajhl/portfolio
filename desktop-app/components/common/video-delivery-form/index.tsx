import React from "react";
import ContractTypeCards from "../cards/contract-type";
import InputWithFloatLabel from "../form/input-with-float-label";
import styles from "./styles.module.scss";
import useForm from "lib/hooks/useForm";
import SubmitButton from "../button/submit-button";

type VideoDeliveryFormProps = {
  celebrityFullName: string;
  onSubmit: (values: InitialValues) => void;
};

const initialValues = {
  contractType: 1,
  deliveryTo: "",
  deliveryFrom: ""
};

type InitialValues = typeof initialValues;
const VideoDeliveryForm = ({
  celebrityFullName,
  onSubmit
}: VideoDeliveryFormProps) => {
  const {
    values,
    setFieldValue,
    validateBeforeSubmit
  } = useForm<InitialValues>({
    initialValues,
    onSubmit
  });
  return (
    <div className={styles.VideoDeliveryForm}>
      <h3>
        Video personalizado
        <br /> de {celebrityFullName}
      </h3>
      <ContractTypeCards
        currentType={values.contractType}
        onChangeType={(e) => setFieldValue("contractType", e)}
      ></ContractTypeCards>
      <div className={styles.InputFieldElements}>
        <div className={styles.InputField}>
          <span className={styles.ExtraLabel}>Para:</span>
          <InputWithFloatLabel
            className={styles.InputFieldModififier}
            value={values.deliveryTo}
            onChangeValue={(e) => setFieldValue("deliveryTo", e)}
            placeholder="¿Quién recibirá el video?"
          ></InputWithFloatLabel>
        </div>
        <div className={styles.InputField}>
          <span className={styles.ExtraLabel}>De:</span>
          <InputWithFloatLabel
            className={styles.InputFieldModififier}
            value={values.deliveryFrom}
            onChangeValue={(e) => setFieldValue("deliveryFrom", e)}
            placeholder="¿Quién envía el video?"
          ></InputWithFloatLabel>
        </div>
      </div>
      <SubmitButton onClick={validateBeforeSubmit}>Siguiente</SubmitButton>
    </div>
  );
};

export default VideoDeliveryForm;
