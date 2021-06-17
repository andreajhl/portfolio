import MyHiringsContract from "desktop-app/types/myHiringsContract";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { ContractInstructionsTextarea } from "../../common/form/contract-instructions-textarea";
import { ContractOccasion } from "../../common/widgets/contract-occasion";
import { EditingToggleButton } from "../../common/button/editing-toggle-button";
import { ContractDataFormInput } from "../../common/form/contract-data-form-input";
import { Link } from "desktop-app/components/common/routing/link";
import { getCelebrityProfilePath } from "constants/paths";
import classes from "classnames";
import { canEditContract } from "desktop-app/constants/contractStatuses";
import Maybe from "desktop-app/components/common/helpers/maybe";
import styles from "./styles.module.scss";
import { Dispatch, SetStateAction } from "react";

type MyHiringsCardDetailsProps = {
  contractData: MyHiringsContract;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  values: { deliveryTo: string; deliveryFrom: string; instructions: string };
  onChangeField: (event) => void;
  onSave?: () => void;
};

function MyHiringsCardDetails({
  contractData,
  isEditing,
  setIsEditing,
  values,
  onChangeField,
  onSave = function () {},
}: MyHiringsCardDetailsProps) {
  const contractIsForOther = contractData.contractType === 2;

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
            name="deliveryTo"
            value={values.deliveryTo}
            onChange={onChangeField}
            disabled={!isEditing}
            maxLength={40}
          />
          <Maybe it={contractIsForOther}>
            <br />
            <ContractDataFormInput
              label="De"
              name="deliveryFrom"
              value={values.deliveryFrom}
              disabled={!isEditing}
              className={styles.MyHiringsCardDetailsDeliveryFrom}
              maxLength={40}
            />
          </Maybe>
        </div>
        <Maybe it={canEditContract(contractData.status)}>
          <div
            className={classes(
              styles.MyHiringsCardDetailsEditButtonWrapper,
              isEditing && styles.MyHiringsCardDetailsEditButtonWrapperIsEditing
            )}
          >
            <EditingToggleButton
              isEditing={isEditing}
              editButtonColor={"var(--secondary)"}
              saveButtonColor={"var(--secondary)"}
              onClickEdit={() => setIsEditing((isEditing) => !isEditing)}
              onClickSave={onSave}
            />
          </div>
        </Maybe>
      </div>
      <div className={styles.MyHiringsCardDetailsInstructionWrapper}>
        <ContractInstructionsTextarea
          disabled={!isEditing}
          value={values.instructions}
          onChange={onChangeField}
          name="instructions"
          maxLength={300}
        />
      </div>
    </div>
  );
}

export { MyHiringsCardDetails };
