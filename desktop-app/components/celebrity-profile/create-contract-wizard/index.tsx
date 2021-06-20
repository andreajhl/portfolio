import { connect, ConnectedProps } from "react-redux";
import { Wizard, Steps as StepsList, Step } from "react-albus";
import styles from "./styles.module.scss";
import { ContractDetailsForm } from "../contract-details-form";
import ContractDeliveryForm from "desktop-app/components/celebrity-profile/contract-delivery-form";
import { useEffect, useState } from "react";
import ContractNotificationsForm from "desktop-app/components/celebrity-profile/contract-notifications-form";
import { saveClientContract } from "react-app/src/state/ducks/contracts/actions";
import ContractDataType, {
  ContractDeliveryType,
  ContractDetailsType,
  ContractNotificationsType,
} from "desktop-app/types/contractDataType";
import { useAuth0 } from "@auth0/auth0-react";
import { RootState } from "react-app/src/state/store";
import useWizardHistory from "../../../../lib/hooks/useWizardHistory";
import { ComponentProps } from "./types";
import classes from "classnames";

type WizardStepType = {
  id: string;
};

export const WIZARD_STEPS: WizardStepType[] = [
  { id: "delivery" },
  { id: "video-details" },
  { id: "notifications" },
];

export function getInitialWizardStep(contractInProgress: {
  [key: string]: any;
}): WizardStepType {
  return WIZARD_STEPS[contractInProgress?.status] || WIZARD_STEPS[0];
}

const mapStateToProps = ({ contracts }: RootState) => ({
  isLoading: contracts.saveClientContractReducer.loading,
});

const mapDispatchToProps = { saveClientContract };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CreateContractWizardProps = ComponentProps & PropsFromRedux;

function CreateContractWizard({
  className,
  celebrity,
  contractInProgress,
  isLoading,
  saveClientContract,
}: CreateContractWizardProps) {
  const { loginWithPopup, isAuthenticated } = useAuth0();
  const [onLoggingCallback, setOnLoggingCallback] = useState(() => () => {});
  const [deliveryData, setDeliveryData] = useState<ContractDeliveryType | null>(
    null
  );

  const [detailsData, setDetailsData] = useState<ContractDetailsType | null>(
    null
  );

  const [
    notificationsData,
    setNotificationsData,
  ] = useState<ContractNotificationsType | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    onLoggingCallback?.();
  }, [isAuthenticated, onLoggingCallback]);

  const { wizardHistory, nextStep } = useWizardHistory(
    WIZARD_STEPS,
    getInitialWizardStep(contractInProgress)
  );

  function saveContractFirstStep(data: ContractDeliveryType) {
    function continueToNextStep() {
      setDeliveryData(data);
      nextStep();
    }
    if (!isAuthenticated) {
      setOnLoggingCallback(() => continueToNextStep);
      loginWithPopup();
    } else {
      continueToNextStep();
    }
  }

  function saveContractSecondStep(values: ContractDetailsType) {
    setDetailsData(values);
    nextStep();
  }

  function getContractData(
    values: ContractNotificationsType
  ): ContractDataType {
    return Object.assign(
      {
        celebrityId: celebrity.id,
      },
      deliveryData,
      detailsData,
      values
    );
  }

  function finishContractCreation(values: ContractNotificationsType) {
    const contractData: ContractDataType = getContractData(values);
    saveClientContract(contractData);
  }

  return (
    <div className={classes(styles.CreateContractWizard, className)}>
      <Wizard history={wizardHistory}>
        <StepsList>
          <Step id={WIZARD_STEPS[0].id}>
            <ContractDeliveryForm
              celebrity={celebrity}
              initialValues={deliveryData}
              onStepChange={saveContractFirstStep}
              onSubmit={saveContractFirstStep}
            />
          </Step>
          <Step id={WIZARD_STEPS[1].id}>
            <ContractDetailsForm
              deliveryTo={deliveryData?.deliveryTo}
              celebrityFullName={celebrity.fullName}
              contractType={deliveryData?.contractType}
              initialValues={detailsData}
              onStepChange={saveContractSecondStep}
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
    </div>
  );
}

const _CreateContractWizard = connector(CreateContractWizard);

export { _CreateContractWizard as CreateContractWizard };
