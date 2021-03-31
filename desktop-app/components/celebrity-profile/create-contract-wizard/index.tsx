import { celebrityType } from "react-app/src/types/celebrityType";
import { connect } from "react-redux";
import { Wizard, Steps as StepsList, Step } from "react-albus";
import styles from "./styles.module.scss";
import { WizardTopNavigation } from "desktop-app/components/wizard-top-navigation";
import { VideoDetailsForm } from "desktop-app/components/video-details-form";
import VideoDeliveryForm from "desktop-app/components/common/video-delivery-form";
import { useState } from "react";
import VideoNotificationForm from "desktop-app/components/video-notifications-form";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CreateContractWizardProps = {
  celebrity: celebrityType;
};

function CreateContractWizard({ celebrity }: CreateContractWizardProps) {
  const [videoDeliveryData, setVideoDeliveryData] = useState(null);
  return (
    <div className={styles.CreateContractWizard}>
      <Wizard>
        <WizardTopNavigation enableNavigation />
        <StepsList>
          <Step id="delivery">
            {({ next }) => (
              <VideoDeliveryForm
                videoMessagePrice={celebrity.videoMessagePrice}
                celebrityFullName={celebrity.fullName}
                // TODO: agregar estos datos en modelo celebrity
                bussinessPrice={celebrity.videoMessagePrice}
                showBussinessPrice={true}
                onSubmit={(data) => {
                  setVideoDeliveryData(data);
                  next();
                }}
              ></VideoDeliveryForm>
            )}
          </Step>
          <Step id="video-details">
            {({ next }) => (
              <VideoDetailsForm
                deliveryTo={"German"}
                celebrityFullName={celebrity.fullName}
                contractType={1}
                celebrityUsername={celebrity.username}
                onSubmit={console.log}
              />
            )}
          </Step>
          <Step id="notifications">
            <h3>
              Video personalizado
              <br /> de {celebrity.fullName}
            </h3>
            <VideoNotificationForm />
            {/* <input
              type="text"
              name="deliveryFrom"
              value={form.values.deliveryFrom}
              onChange={form.onChangeField}
            /> */}
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
