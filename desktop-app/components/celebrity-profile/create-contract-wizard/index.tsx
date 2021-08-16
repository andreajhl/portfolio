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
import { useAuth } from "lib/famosos-auth";
import useWizardHistory from "../../../../lib/hooks/useWizardHistory";
import { ComponentProps } from "./types";
import classes from "classnames";
import { useRouter } from "next/router";
import {
  getCelebrityProfilePath,
  getPaymentMethodsPath,
  getSignInFromPath,
} from "constants/paths";
import usePromise from "lib/hooks/usePromise";
import ContractInProgressType from "desktop-app/types/contractInProgressType";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { FormattedMessage } from "react-intl";
import { CollapsibleErrorMessage } from "desktop-app/components/common/widgets/collapsible-error-message";
import { analytics } from "react-app/src/state/utils/gtm";
import { VIDEO_MESSAGE_PRODUCT_ID_PREFIX } from "constants/dynamicAds";
import { getCelebrityContractPrice } from "lib/utils/celebrityUtils";
import {
  setLocalContractInProgress,
  deleteLocalContractInProgress,
} from "lib/utils/localContractInProgress";
import { Session } from "react-app/src/state/utils/session";
import objectHasProperties from "lib/utils/objectHasProperties";

const NO_TOKEN_ERROR = "invalid token: no token string was provided";

function getDeliveryDataFromContractInProgress(
  contractInProgress: ContractInProgressType
) {
  if (!contractInProgress || !objectHasProperties(contractInProgress)) {
    return null;
  }
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
  { id: "contract-delivery-form" },
  { id: "contract-details-form" },
  { id: "contract-notifications-form" },
];

export function getInitialWizardStep(
  contractInProgress: ContractInProgressType
) {
  return WIZARD_STEPS[contractInProgress?.status] || WIZARD_STEPS[0];
}

type CreateContractWizardProps = ComponentProps;

const WIDGET_NAME = "CreateContractWizard";

function CreateContractWizard({
  className,
  celebrity,
  contractInProgress,
}: CreateContractWizardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
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

  const { wizardHistory, nextStep, getCurrentStep } = useWizardHistory(
    WIZARD_STEPS,
    getInitialWizardStep(contractInProgress)
  );

  const isLoading = status === "loading";

  useEffect(() => {
    if (typeof currentContractId === "undefined") return;
    function tractLeave(newRoute: string) {
      analytics.track("CREATE_CONTRACT_WIZARD_LEAVE", {
        newRoute,
        widget: WIDGET_NAME,
        celebrityUsername: celebrity.username,
        currentContractId,
        currentStep: WIZARD_STEPS.indexOf(getCurrentStep()) + 1,
        deliveryData,
        detailsData,
        notificationsData,
      });
    }
    router.events.on("routeChangeStart", tractLeave);

    return () => router.events.off("routeChangeStart", tractLeave);
  }, [
    celebrity.username,
    currentContractId,
    deliveryData,
    detailsData,
    getCurrentStep,
    notificationsData,
    router.events,
  ]);

  function catchAsyncError(fn: any) {
    return (...params: any) => {
      setErrorMessage(null);
      if (isLoading) return;
      handle(fn(...params))?.catch?.((error: any) => {
        let errorMessage = error?.response?.data?.error || error?.message;
        if (errorMessage === NO_TOKEN_ERROR) {
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

  async function updateCurrentContractStep(data: any, step: number) {
    const updateData = { ...data, id: currentContractId };
    const result = await updateContractStep(updateData, step);
    analytics.track("UPDATE_CONTRACT_STEP_" + step, {
      ...updateData,
      widget: WIDGET_NAME,
      contractId: currentContractId,
      step,
    });
    return result;
  }

  async function saveNewContract(data: ContractDeliveryType) {
    const createData = {
      ...data,
      celebrityId: celebrity.id,
    };
    const { id } = await createContract(createData);
    analytics.track("CREATE_CONTRACT_PARTIALLY", {
      ...createData,
      widget: WIDGET_NAME,
      contractId: id,
    });
    setCurrentContractId(id);
  }

  function createOrUpdateContractFirstStep(data: ContractDeliveryType) {
    if (currentContractId) {
      return updateCurrentContractStep(data, 1);
    }
    return saveNewContract(data);
  }

  async function saveContractLocally(data: ContractDeliveryType) {
    setLocalContractInProgress(celebrity.id, data);
    Session.setRedirectPathOnLogin(
      getCelebrityProfilePath(celebrity.username, {
        focusCreateContractWizard: true,
      })
    );
    analytics.track("CREATE_CONTRACT_UNAUTHENTICATED", {
      ...data,
      widget: WIDGET_NAME,
      celebrityUsername: celebrity.username,
    });
    await router.push(
      getSignInFromPath({
        celebrity: celebrity.fullName,
        suggestedFullName:
          data.contractType === 2 ? data.deliveryFrom : data.deliveryTo,
      })
    );
  }

  async function continueFirstStep(data: ContractDeliveryType) {
    await createOrUpdateContractFirstStep(data);
    deleteLocalContractInProgress(celebrity.id);
    setDeliveryData(data);
    nextStep();
  }

  const saveContractFirstStep = catchAsyncError(async function (
    data: ContractDeliveryType
  ) {
    if (isAuthenticated) {
      await continueFirstStep(data);
    } else {
      await saveContractLocally(data);
    }
  });

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
    analytics.track(
      "CONTRACT_CREATED",
      Object.assign({ celebrity }, deliveryData, detailsData, values)
    );
    analytics.fbPixel("track", "InitiateCheckout", {
      content_type: "product",
      content_ids: VIDEO_MESSAGE_PRODUCT_ID_PREFIX + celebrity.id,
      value: getCelebrityContractPrice(celebrity),
      currency: "USD",
    });
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
