import { useEffect } from "react";
import ContractTypeCards from "../../common/cards/contract-type";
import styles from "./styles.module.scss";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import Maybe from "../../common/helpers/maybe";
import WhatsappAdForContracts from "../../common/whatsapp-ad-for-contracts";
import VideoDeliveryFormFieldsElements from "../../common/video-delivery-form-fields-elements";
import { ContractDeliveryType } from "desktop-app/types/contractDataType";
import { WizardTopNavigation } from "desktop-app/components/common/wizard-top-navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { celebrityType } from "desktop-app/types/celebrityType";
import { CelebrityVideoContractPrice } from "desktop-app/components/common/helpers/celebrity-video-contract-price";
import { CelebrityBusinessPrice } from "../celebrity-business-price";
import getCelebrityBusinessPrice from "lib/utils/getCelebrityBusinessPrice";

type ContractDeliveryFormProps = {
  celebrity: celebrityType;
  initialValues?: ContractDeliveryType;
  onSubmit: (values: ContractDeliveryType) => void;
  onStepChange: (values: ContractDeliveryType) => void;
};

const initialValues: ContractDeliveryType = {
  contractType: 1,
  deliveryTo: "",
  deliveryFrom: "",
  deliveryType: 1,
};

const validations: ValidationsType<ContractDeliveryType> = {
  deliveryTo(value) {
    if (value.length === 0) return "Debes introducir un nombre";
    if (value.length > 40) {
      return "Debes introducir un máximo de 40 caracteres.";
    }
  },
  deliveryFrom(value, { values: { contractType } }) {
    if (contractType !== 2) return;
    if (value.length === 0) return "Debes introducir un nombre";
    if (value.length > 40) {
      return "Debes introducir un máximo de 40 caracteres.";
    }
  },
};

function ContractDeliveryForm({
  celebrity,
  initialValues: initialValuesFromProps,
  onSubmit,
  onStepChange,
}: ContractDeliveryFormProps) {
  const {
    values,
    errors,
    setFieldValue,
    validateFields,
    validateBeforeSubmit,
  } = useForm<ContractDeliveryType>({
    initialValues: initialValuesFromProps || initialValues,
    validations,
    onSubmit,
  });

  const { user } = useAuth0();

  useEffect(() => {
    if (values.deliveryTo || !user) return;
    setFieldValue("deliveryTo", user.given_name);
  }, [user]);

  const celebrityFullName = celebrity?.fullName;

  const businessPrice = getCelebrityBusinessPrice(celebrity.contractTypes);
  const hasBusinessPrice = businessPrice > 0;
  const contractIsForBusiness = values.contractType === 3;

  function validateFormBeforeChangeStep(goToClickedStep: () => void): void {
    if (contractIsForBusiness && !hasBusinessPrice) return;
    if (!validateFields()) return;
    onStepChange(values);
    goToClickedStep();
  }

  function changeContractType(type: number): void {
    setFieldValue("contractType", type);
  }

  return (
    <section className={styles.VideoDeliveryForm}>
      <WizardTopNavigation
        enableNavigation
        onStepClick={validateFormBeforeChangeStep}
      />
      <header className={styles.VideoDeliveryFormHeader}>
        <h3>
          Video personalizado
          <br /> de {celebrityFullName}
        </h3>
        <span>
          <Maybe
            it={contractIsForBusiness}
            orElse={<CelebrityVideoContractPrice celebrity={celebrity} />}
          >
            <CelebrityBusinessPrice celebrity={celebrity} />
          </Maybe>
        </span>
      </header>
      <ContractTypeCards
        currentType={values.contractType}
        onChangeType={changeContractType}
      />
      <div className={styles.InputFieldElements}>
        <VideoDeliveryFormFieldsElements
          hasBusinessPrice={hasBusinessPrice}
          deliveryFrom={values.deliveryFrom}
          deliveryTo={values.deliveryTo}
          contractType={values.contractType}
          onSubmit={validateBeforeSubmit}
          onChange={setFieldValue}
          errors={errors}
        />
        <Maybe it={contractIsForBusiness && !hasBusinessPrice}>
          <WhatsappAdForContracts celebrityFullName={celebrityFullName} />
        </Maybe>
      </div>
    </section>
  );
}

export default ContractDeliveryForm;
