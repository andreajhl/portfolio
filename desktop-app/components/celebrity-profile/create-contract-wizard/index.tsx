import { celebrityType } from "desktop-app/types/celebrityType";
import { connect } from "react-redux";
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

const mapStateToProps = ({ contracts }) => ({
  isLoading: contracts.saveClientContractReducer.loading,
});

const mapDispatchToProps = { saveClientContract };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CreateContractWizardProps = {
  celebrity: celebrityType;
} & DispatchProps &
  StateProps;

function CreateContractWizard({
  celebrity,
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

  return (
    <div className={styles.CreateContractWizard}>
      <Wizard>
        <StepsList>
          <Step id="delivery">
            {({ next }) => (
              <ContractDeliveryForm
                celebrity={celebrity}
                initialValues={deliveryData}
                onStepChange={setDeliveryData}
                onSubmit={async (data) => {
                  function continueToNextStep() {
                    setDeliveryData(data);
                    next();
                  }
                  if (!isAuthenticated) {
                    setOnLoggingCallback(() => continueToNextStep);
                    loginWithPopup();
                  } else {
                    continueToNextStep();
                  }
                }}
              />
            )}
          </Step>
          <Step id="video-details">
            {({ next }) => (
              <ContractDetailsForm
                deliveryTo={deliveryData?.deliveryTo}
                celebrityFullName={celebrity.fullName}
                contractType={deliveryData?.contractType}
                initialValues={detailsData}
                onStepChange={setDetailsData}
                onSubmit={(values) => {
                  setDetailsData(values);
                  next();
                }}
              />
            )}
          </Step>
          <Step id="notifications">
            <ContractNotificationsForm
              isLoading={isLoading}
              initialValues={notificationsData}
              onStepChange={setNotificationsData}
              onSubmit={(values) => {
                const contractData: ContractDataType = Object.assign(
                  {
                    celebrityId: celebrity.id,
                  },
                  deliveryData,
                  detailsData,
                  values
                );
                saveClientContract(contractData);
              }}
            />
          </Step>
        </StepsList>
      </Wizard>
    </div>
  );
}

const _CreateContractWizard = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContractWizard);

export { _CreateContractWizard as CreateContractWizard };
