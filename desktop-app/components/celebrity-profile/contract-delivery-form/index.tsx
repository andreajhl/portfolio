import { useEffect } from "react";
import ContractTypeCards from "../../common/cards/contract-type";
import styles from "./styles.module.scss";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import Maybe from "../../common/helpers/maybe";
import WhatsappAdForContracts from "../../common/whatsapp-ad-for-contracts";
import VideoDeliveryFormFieldsElements from "../../common/video-delivery-form-fields-elements";
import { ContractDeliveryType } from "desktop-app/types/contractDataType";
import { WizardTopNavigation } from "desktop-app/components/common/wizard-top-navigation";
import { useAuth } from "lib/famosos-auth";
import { celebrityType } from "desktop-app/types/celebrityType";
import { CelebrityVideoContractPrice } from "desktop-app/components/common/helpers/celebrity-video-contract-price";
import { CelebrityBusinessPrice } from "../celebrity-business-price";
import getCelebrityBusinessPrice from "lib/utils/getCelebrityBusinessPrice";
import { FormattedMessage, IntlFormatters, useIntl } from "react-intl";
import {
  getDeliveryFromValidator,
  getDeliveryToValidator,
} from "lib/validations/contractData";

const br = <br />;

const initialValues: ContractDeliveryType = {
  contractType: 1,
  deliveryTo: "",
  deliveryFrom: "",
  deliveryType: 1,
};

function getValidations(
  formatMessage: IntlFormatters["formatMessage"]
): ValidationsType<ContractDeliveryType> {
  return {
    deliveryTo: getDeliveryToValidator(formatMessage),
    deliveryFrom: getDeliveryFromValidator(formatMessage),
  };
}

function getSanitizedValues(values: ContractDeliveryType) {
  return values.contractType === 2
    ? values
    : { ...values, deliveryFrom: initialValues.deliveryFrom };
}

function shouldSwapDeliveryInfoValues(
  currentContractType: number,
  newContractType: number
) {
  if (currentContractType === 1 && newContractType === 3) return false;
  if (currentContractType === 3 && newContractType === 1) return false;
  return true;
}

type ContractDeliveryFormProps = {
  celebrity: celebrityType;
  isLoading: boolean;
  initialValues?: ContractDeliveryType;
  onSubmit: (values: ContractDeliveryType) => void;
};

function ContractDeliveryForm({
  celebrity,
  isLoading,
  initialValues: initialValuesFromProps,
  onSubmit: onSubmitFromProps,
}: ContractDeliveryFormProps) {
  const { formatMessage } = useIntl();
  const {
    values,
    errors,
    setFieldValue,
    validateBeforeSubmit,
  } = useForm<ContractDeliveryType>({
    initialValues: Object.assign({}, initialValues, initialValuesFromProps),
    validations: getValidations(formatMessage),
    onSubmit(values) {
      onSubmitFromProps(getSanitizedValues(values));
    },
  });

  const { user } = useAuth();

  useEffect(() => {
    if (values.deliveryTo || !user) return;
    setFieldValue("deliveryTo", user.given_name);
  }, [user]);

  const celebrityFullName = celebrity?.fullName;

  const businessPrice = getCelebrityBusinessPrice(celebrity.contractTypes);
  const hasBusinessPrice = businessPrice > 0;
  const contractIsForBusiness = values.contractType === 3;

  function validateFormBeforeChangeStep() {
    if (isLoading) return;
    if (contractIsForBusiness && !hasBusinessPrice) return;
    validateBeforeSubmit();
  }

  function swapDeliveryInfoValues(newContractType: number) {
    const { deliveryTo, deliveryFrom, contractType } = values;
    if (!shouldSwapDeliveryInfoValues(contractType, newContractType)) return;
    setFieldValue("deliveryFrom", deliveryTo, false);
    setFieldValue("deliveryTo", deliveryFrom, false);
  }

  function changeContractType(newContractType: number): void {
    swapDeliveryInfoValues(newContractType);
    setFieldValue("contractType", newContractType);
  }

  return (
    <section className={styles.VideoDeliveryForm}>
      <WizardTopNavigation
        enableNavigation
        onStepClick={validateFormBeforeChangeStep}
      />
      <header className={styles.VideoDeliveryFormHeader}>
        <h3>
          <FormattedMessage
            defaultMessage="Video personalizado {br} de {celebrityFullName}"
            values={{ celebrityFullName, br }}
          />
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
      <form
        className={styles.InputFieldElements}
        onSubmit={validateBeforeSubmit}
      >
        <VideoDeliveryFormFieldsElements
          isLoading={isLoading}
          hasBusinessPrice={hasBusinessPrice}
          deliveryFrom={values.deliveryFrom}
          deliveryTo={values.deliveryTo}
          contractType={values.contractType}
          onChange={setFieldValue}
          errors={errors}
        />
        <Maybe it={contractIsForBusiness && !hasBusinessPrice}>
          <WhatsappAdForContracts celebrityFullName={celebrityFullName} />
        </Maybe>
      </form>
    </section>
  );
}

export default ContractDeliveryForm;
