import React from "react";
import ContractTypeCards from "../cards/contract-type";
import styles from "./styles.module.scss";
import useForm from "lib/hooks/useForm";
import Maybe from "../helpers/maybe";
import WhatsapAdForContracts from "../whatsapp-ad-for-contracts";
import VideoDeliveryFormFieldsElements from "../video-delivery-form-fields-elements";
import { PriceLayout } from "../helpers/price-layout";

type VideoDeliveryFormProps = {
  celebrityFullName: string;
  videoMessagePrice: number;
  bussinessPrice: number;
  showBussinessPrice: boolean;
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
  videoMessagePrice = 200,
  bussinessPrice = 222,
  showBussinessPrice = true,
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
        <Maybe it={values.contractType === 3 && showBussinessPrice}>
          <span>{bussinessPrice}$</span>
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
        ></VideoDeliveryFormFieldsElements>
        <Maybe it={values.contractType === 3}>
          <WhatsapAdForContracts
            celebrityFullName={celebrityFullName}
          ></WhatsapAdForContracts>
        </Maybe>
      </div>
    </div>
  );
};

export default VideoDeliveryForm;
