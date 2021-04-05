import { useEffect } from "react";
import ContractTypeCards from "../../common/cards/contract-type";
import styles from "./styles.module.scss";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import Maybe from "../../common/helpers/maybe";
import WhatsappAdForContracts from "../../common/whatsapp-ad-for-contracts";
import VideoDeliveryFormFieldsElements from "../../common/video-delivery-form-fields-elements";
import { PriceLayout } from "../../common/helpers/price-layout";
import { ContractDeliveryType } from "desktop-app/types/contractDataType";
import { WizardTopNavigation } from "desktop-app/components/common/wizard-top-navigation";
import { useAuth0 } from "@auth0/auth0-react";

type ContractDeliveryFormProps = {
  celebrityFullName: string;
  videoMessagePrice: number;
  businessPrice: number;
  showBusinessPrice: boolean;
  initialValues?: ContractDeliveryType;
  onSubmit: (values: ContractDeliveryType) => void;
  onStepChange: (values: ContractDeliveryType) => void;
};

const initialValues: ContractDeliveryType = {
  contractType: 1,
  deliveryTo: "",
  deliveryFrom: "",
  deliveryType: 1
};

const validations: ValidationsType<ContractDeliveryType> = {
  contractType(value) {
    if (value === 3) return "No puedes continuar si seleccionas esta opción";
  },
  deliveryTo(value) {
    if (value.length === 0) return "Debes introducir un nombre";
    if (value.length > 40) {
      return "Debes introducir un máximo de 40 caracteres.";
    }
  },
  deliveryFrom(value, { values: { contractType } }) {
    if (contractType === 1) return;
    if (value.length === 0) return "Debes introducir un nombre";
    if (value.length > 40) {
      return "Debes introducir un máximo de 40 caracteres.";
    }
  }
};

const ContractDeliveryForm = ({
  celebrityFullName,
  videoMessagePrice = 200,
  businessPrice,
  showBusinessPrice = false,
  initialValues: initialValuesFromProps,
  onSubmit,
  onStepChange
}: ContractDeliveryFormProps) => {
  const {
    values,
    errors,
    setFieldValue,
    validateFields,
    validateBeforeSubmit
  } = useForm<ContractDeliveryType>({
    initialValues: initialValuesFromProps || initialValues,
    validations,
    onSubmit
  });

  const { user } = useAuth0();

  useEffect(() => {
    if (values.deliveryTo || !user) return;
    setFieldValue("deliveryTo", user.given_name);
  }, [user]);

  return (
    <section className={styles.VideoDeliveryForm}>
      <WizardTopNavigation
        enableNavigation
        onStepClick={(goToClickedStep) => {
          if (!validateFields()) return;
          onStepChange(values);
          goToClickedStep();
        }}
      />
      <header className={styles.VideoDeliveryFormHeader}>
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
      </header>
      <ContractTypeCards
        currentType={values.contractType}
        onChangeType={(type) => setFieldValue("contractType", type)}
      />
      <div className={styles.InputFieldElements}>
        <VideoDeliveryFormFieldsElements
          deliveryFrom={values.deliveryFrom}
          deliveryTo={values.deliveryTo}
          contractType={values.contractType}
          onSubmit={validateBeforeSubmit}
          onChange={setFieldValue}
          errors={errors}
        />
        <Maybe it={values.contractType === 3}>
          <WhatsappAdForContracts celebrityFullName={celebrityFullName} />
        </Maybe>
      </div>
    </section>
  );
};

export default ContractDeliveryForm;
