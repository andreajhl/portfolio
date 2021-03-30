import { celebrityType } from "react-app/src/types/celebrityType";
import { connect } from "react-redux";
import { Wizard, Steps as StepsList, Step } from "react-albus";
import styles from "./styles.module.scss";
import { WizardTopNavigation } from "desktop-app/components/wizard-top-navigation";
import { VideoDetailsForm } from "desktop-app/components/video-details-form";
import useForm from "lib/hooks/useForm";
import VideoDeliveryForm from "desktop-app/components/common/video-delivery-form";
import { useState } from "react";

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
                celebrityFullName={celebrity.fullName}
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
          <Step id="detalles">
            <h3>
              Video personalizado
              <br /> de {celebrity.fullName}
            </h3>

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
