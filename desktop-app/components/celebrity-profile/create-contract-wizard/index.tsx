import { celebrityType } from "desktop-app/types/celebrityType";
import { connect } from "react-redux";
import { Wizard, Steps as StepsList, Step } from "react-albus";
import styles from "./styles.module.scss";
import { VideoDetailsForm } from "../video-details-form";
import VideoDeliveryForm from "desktop-app/components/celebrity-profile/video-delivery-form";
import { useState } from "react";
import VideoNotificationForm from "desktop-app/components/celebrity-profile/video-notifications-form";
import { saveClientContract } from "react-app/src/state/ducks/contracts/actions";
import ContractDataType, {
  ContractDeliveryType,
  ContractDetailsType,
  ContractNotificationsType
} from "desktop-app/types/contractDataType";

const mapStateToProps = ({ contracts }) => ({
  isLoading: contracts.saveClientContractReducer.loading
});

const mapDispatchToProps = { saveClientContract };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CreateContractWizardProps = {
  celebrity: celebrityType;
} & DispatchProps &
  StateProps;

const getContractPriceVideoMessage = (contractsTypes) =>
  contractsTypes?.find?.((contract) => contract.contractType === 1)?.price || 0;

function CreateContractWizard({
  celebrity,
  isLoading,
  saveClientContract
}: CreateContractWizardProps) {
  const [deliveryData, setDeliveryData] = useState<ContractDeliveryType | null>(
    null
  );

  const [detailsData, setDetailsData] = useState<ContractDetailsType | null>(
    null
  );

  const [
    notificationsData,
    setNotificationsData
  ] = useState<ContractNotificationsType | null>(null);

  const videoMessagePrice = getContractPriceVideoMessage(
    celebrity.contractTypes
  );

  return (
    <div className={styles.CreateContractWizard}>
      <Wizard>
        <StepsList>
          <Step id="delivery">
            {({ next }) => (
              <VideoDeliveryForm
                videoMessagePrice={videoMessagePrice}
                celebrityFullName={celebrity.fullName}
                // TODO: agregar estos datos en modelo celebrity
                businessPrice={500}
                showBusinessPrice
                initialValues={deliveryData}
                onStepChange={setDeliveryData}
                onSubmit={(data) => {
                  setDeliveryData(data);
                  next();
                }}
              />
            )}
          </Step>
          <Step id="video-details">
            {({ next }) => (
              <VideoDetailsForm
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
            <VideoNotificationForm
              isLoading={isLoading}
              initialValues={notificationsData}
              onStepChange={setNotificationsData}
              onSubmit={(values) => {
                const contractData: ContractDataType = Object.assign(
                  {
                    celebrityId: celebrity.id
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
