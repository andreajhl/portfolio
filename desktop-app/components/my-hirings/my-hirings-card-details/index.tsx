import MyHiringsContract from "desktop-app/types/myHiringsContract";
import { useState } from "react";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { connect } from "react-redux";
import { ContractInstructionsTextarea } from "../../common/form/contract-instructions-textarea";
import { ContractOccasion } from "../../common/widgets/contract-occasion";
import { EditingToggleButton } from "../../common/button/editing-toggle-button";
import { ContractDataFormInput } from "../../common/form/contract-data-form-input";
import styles from "./styles.module.scss";
import { Link } from "desktop-app/components/common/routing/link";
import { getCelebrityProfilePath } from "constants/paths";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type MyHiringsCardDetailsProps = {
  contractData: MyHiringsContract;
} & StateProps &
  DispatchProps;

function MyHiringsCardDetails({ contractData }: MyHiringsCardDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.MyHiringsCardDetails}>
      <Link href={getCelebrityProfilePath(contractData.celebrityData.username)}>
        <ProfilePicture
          avatar={contractData.celebrityData.avatar}
          width={143}
        />
      </Link>
      <div className={styles.MyHiringsCardDetailsDeliveryData}>
        <div>
          <ContractOccasion
            occasion={contractData.occasion}
            className={styles.MyHiringsCardDetailsOccasion}
          />
          <ContractDataFormInput
            label="Para"
            value="Ana"
            disabled={!isEditing}
            className={styles.MyHiringsCardDetailsDeliveryTo}
          />
          <br />
          <ContractDataFormInput
            label="De"
            value="Camilo"
            disabled={!isEditing}
          />
        </div>
        <div
          className={`${styles.MyHiringsCardDetailsEditButtonWrapper} ${
            isEditing
              ? styles.MyHiringsCardDetailsEditButtonWrapperIsEditing
              : ""
          }`}
        >
          <EditingToggleButton
            isEditing={isEditing}
            editButtonColor={"var(--secondary)"}
            saveButtonColor={"var(--secondary)"}
            onClickEdit={() => setIsEditing((isEditing) => !isEditing)}
            onClickSave={() => setIsEditing((isEditing) => !isEditing)}
          />
        </div>
      </div>
      <div className={styles.MyHiringsCardDetailsInstructionWrapper}>
        <ContractInstructionsTextarea
          disabled={!isEditing}
          value={contractData.instructions}
        />
      </div>
    </div>
  );
}

const _MyHiringsCardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHiringsCardDetails);

export { _MyHiringsCardDetails as MyHiringsCardDetails };
