import { celebrityType } from "desktop-app/types/celebrityType";
import { connect } from "react-redux";
import { Wizard, Steps as StepsList, Step } from "react-albus";
import styles from "./styles.module.scss";
import { WizardTopNavigation } from "../../common/wizard-top-navigation";
import { VideoDetailsForm } from "../video-details-form";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type CreateContractWizardProps = {
  celebrity: celebrityType;
};

function CreateContractWizard({ celebrity }: CreateContractWizardProps) {
  return (
    <div className={styles.CreateContractWizard}>
      <Wizard>
        <WizardTopNavigation enableNavigation />
        <StepsList>
          {/* <Step id="delivery"></Step> */}
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
          <Step id="notification"></Step>
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
