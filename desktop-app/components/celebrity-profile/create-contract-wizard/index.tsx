import { Wizard, Steps as StepsList, Step } from "react-albus";
import styles from "./styles.module.scss";
import { ContractDetailsForm } from "../contract-details-form";
import ContractDeliveryForm from "desktop-app/components/celebrity-profile/contract-delivery-form";
import { useEffect, useState } from "react";
import ContractNotificationsForm from "desktop-app/components/celebrity-profile/contract-notifications-form";
import {
  createContract,
  updateContractStep,
} from "react-app/src/state/ducks/contracts/actions";
import {
  ContractDeliveryType,
  ContractDetailsType,
  ContractNotificationsType,
} from "desktop-app/types/contractDataType";
import { useAuth0 } from "@auth0/auth0-react";
import useWizardHistory from "../../../../lib/hooks/useWizardHistory";
import { ComponentProps } from "./types";
import classes from "classnames";
import { useRouter } from "next/router";
import { getPaymentMethodsPath } from "constants/paths";
import usePromise from "lib/hooks/usePromise";
import ContractInProgressType from "desktop-app/types/contractInProgressType";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { FormattedMessage } from "react-intl";
import { CollapsibleErrorMessage } from "desktop-app/components/common/widgets/collapsible-error-message";

function getDeliveryDataFromContractInProgress(
  contractInProgress: ContractInProgressType
) {
  if (!contractInProgress?.contractId) return null;
  return pickPropertiesFromAObject(contractInProgress, [
    "contractType",
    "deliveryTo",
    "deliveryFrom",
    "deliveryType",
  ]) as ContractDeliveryType;
}

function getDetailsDataFromContractInProgress(
  contractInProgress: ContractInProgressType
) {
  if (!contractInProgress?.contractId || !contractInProgress?.occasion) {
    return null;
  }
  return pickPropertiesFromAObject(contractInProgress, [
    "occasion",
    "instructions",
  ]) as ContractDetailsType;
}

function getNotificationsDataFromContractInProgress(
  contractInProgress: ContractInProgressType
) {
  if (!contractInProgress?.contractId || !contractInProgress?.deliveryContact) {
    return null;
  }
  return pickPropertiesFromAObject(contractInProgress, [
    "deliveryContact",
    "deliveryContactCellphone",
    "isPublic",
  ]) as ContractNotificationsType;
}

const WIZARD_STEPS = [
  { id: "delivery" },
  { id: "video-details" },
  { id: "notifications" },
];

export function getInitialWizardStep(
  contractInProgress: ContractInProgressType
) {
  return WIZARD_STEPS[contractInProgress?.status] || WIZARD_STEPS[0];
}

type CreateContractWizardProps = ComponentProps;

function CreateContractWizard({
  className,
  celebrity,
  contractInProgress,
}: CreateContractWizardProps) {
  const router = useRouter();
  const { loginWithPopup, isAuthenticated } = useAuth0();
  const [onLoggingCallback, setOnLoggingCallback] = useState(() => () => {});
  const [currentContractId, setCurrentContractId] = useState(
    contractInProgress?.contractId
  );
  const { handle, status } = usePromise();
  const [errorMessage, setErrorMessage] = useState(null);
  const [deliveryData, setDeliveryData] = useState<ContractDeliveryType | null>(
    getDeliveryDataFromContractInProgress(contractInProgress)
  );

  const [detailsData, setDetailsData] = useState<ContractDetailsType | null>(
    getDetailsDataFromContractInProgress(contractInProgress)
  );

  const [
    notificationsData,
    setNotificationsData,
  ] = useState<ContractNotificationsType | null>(
    getNotificationsDataFromContractInProgress(contractInProgress)
  );

  useEffect(() => {
    if (!isAuthenticated) return;
    onLoggingCallback?.();
  }, [isAuthenticated, onLoggingCallback]);

  const { wizardHistory, nextStep } = useWizardHistory(
    WIZARD_STEPS,
    getInitialWizardStep(contractInProgress)
  );

  const isLoading = status === "loading";

  function catchAsyncError(fn: any) {
    return (...params: any) => {
      setErrorMessage(null);
      if (isLoading) return;
      handle(fn(...params))?.catch?.((error: any) => {
        let errorMessage = error?.response?.data?.error || error?.message;
        const noTokenError = "invalid token: no token string was provided";
        if (errorMessage === noTokenError) {
          errorMessage = null;
        }
        setErrorMessage(
          errorMessage || (
            <FormattedMessage defaultMessage="Ha ocurrido un error, intentalo nuevamente" />
          )
        );
      });
    };
  }

  function updateCurrentContractStep(data: any, step: number) {
    return updateContractStep({ ...data, id: currentContractId }, step);
  }

  async function saveNewContract(data: ContractDeliveryType) {
    const { id } = await createContract({
      ...data,
      celebrityId: celebrity.id,
    });
    setCurrentContractId(id);
  }

  function createOrUpdateContractFirstStep(data: ContractDeliveryType) {
    if (currentContractId) {
      return updateCurrentContractStep(data, 1);
    }
    return saveNewContract(data);
  }

  function saveContractFirstStep(data: ContractDeliveryType) {
    const continueToNextStep = catchAsyncError(async function () {
      await createOrUpdateContractFirstStep(data);
      setDeliveryData(data);
      nextStep();
    });
    if (!isAuthenticated) {
      setOnLoggingCallback(() => continueToNextStep);
      loginWithPopup();
    } else {
      continueToNextStep();
    }
  }

  const saveContractSecondStep = catchAsyncError(async function (
    values: ContractDetailsType
  ) {
    await updateCurrentContractStep(values, 2);
    setDetailsData(values);
    nextStep();
  });

  const finishContractCreation = catchAsyncError(async function (
    values: ContractNotificationsType
  ) {
    const { reference } = await updateCurrentContractStep(values, 3);
    await router.push(getPaymentMethodsPath(reference));
  });

  return (
    <div className={classes(styles.CreateContractWizard, className)}>
      <Wizard history={wizardHistory}>
        <StepsList>
          <Step id={WIZARD_STEPS[0].id}>
            <ContractDeliveryForm
              isLoading={isLoading}
              celebrity={celebrity}
              initialValues={deliveryData}
              onStepChange={setDeliveryData}
              onSubmit={saveContractFirstStep}
            />
          </Step>
          <Step id={WIZARD_STEPS[1].id}>
            <ContractDetailsForm
              isLoading={isLoading}
              deliveryTo={deliveryData?.deliveryTo}
              celebrityFullName={celebrity.fullName}
              contractType={deliveryData?.contractType}
              initialValues={detailsData}
              onStepChange={setDetailsData}
              onSubmit={saveContractSecondStep}
            />
          </Step>
          <Step id={WIZARD_STEPS[2].id}>
            <ContractNotificationsForm
              isLoading={isLoading}
              initialValues={notificationsData}
              onStepChange={setNotificationsData}
              onSubmit={finishContractCreation}
            />
          </Step>
        </StepsList>
      </Wizard>
      <CollapsibleErrorMessage
        errorMessage={errorMessage}
        className={styles.ErrorMessage}
      />
    </div>
  );
}

export { CreateContractWizard };
