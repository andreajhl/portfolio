import React from "react";
import ContractTypeCards from "../../common/cards/contract-type";
import styles from "./styles.module.scss";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import Maybe from "../../common/helpers/maybe";
import WhatsappAdForContracts from "../../common/whatsapp-ad-for-contracts";
import VideoDeliveryFormFieldsElements from "../../common/video-delivery-form-fields-elements";
import { PriceLayout } from "../../common/helpers/price-layout";

type VideoDeliveryFormProps = {
  celebrityFullName: string;
  videoMessagePrice: number;
  businessPrice: number;
  showBusinessPrice: boolean;
  onSubmit: (values: InitialValues) => void;
};

const initialValues = {
  contractType: 1,
  deliveryTo: "",
  deliveryFrom: ""
};

const validations: ValidationsType<InitialValues> = {
  deliveryTo(value) {
    if (value.length === 0) return "Debes introducir un nombre";
  },
  deliveryFrom(value, { values: { contractType } }) {
    if (contractType === 1) return;
    if (value.length === 0) return "Debes introducir un nombre";
  }
};

type InitialValues = typeof initialValues;

const VideoDeliveryForm = ({
  celebrityFullName,
  videoMessagePrice = 200,
  businessPrice,
  showBusinessPrice = false,
  onSubmit
}: VideoDeliveryFormProps) => {
  const {
    values,
    errors,
    setFieldValue,
    validateBeforeSubmit
  } = useForm<InitialValues>({
    initialValues,
    validations,
    onSubmit
  });
  return (
    <div className={styles.VideoDeliveryForm}>
      <div className={styles.VideoDeliveryFormHeader}>
        <h3>
          Video personalizado
          <br /> de {celebrityFullName}
        </h3>
        <Maybe it={values.contractType !== 3}>
          <span>
            <PriceLayout decimalScale={0} price={videoMessagePrice} />
          </span>
        </Maybe>
        <Maybe it={values.contractType === 3}>
          <span>
            <Maybe it={showBusinessPrice} orElse="$ A convenir">
              <PriceLayout decimalScale={0} price={businessPrice} />
            </Maybe>
          </span>
        </Maybe>
      </div>
      <ContractTypeCards
        currentType={values.contractType}
        onChangeType={(e) => setFieldValue("contractType", e)}
      ></ContractTypeCards>
      <div className={styles.InputFieldElements}>
        <VideoDeliveryFormFieldsElements
          deliveryFrom={values.deliveryFrom}
          deliveryTo={values.deliveryTo}
          contractType={values.contractType}
          onSubmit={validateBeforeSubmit}
          onChange={(field, value) => setFieldValue(field, value)}
          errors={errors}
        ></VideoDeliveryFormFieldsElements>
        <Maybe it={values.contractType === 3}>
          <WhatsappAdForContracts
            celebrityFullName={celebrityFullName}
          ></WhatsappAdForContracts>
        </Maybe>
      </div>
    </div>
  );
};

export default VideoDeliveryForm;
