import useForm from "lib/hooks/useForm";
import React from "react";
import UpdateUserEmail from "../update-user-email";
import { UserAvatarUploader } from "../user-avatar-uploader";
import UpdateUserGender from "../update-user-gender";
import LogoutButton from "react-app/src/components/containers/logout-button/logout-button";
import classes from "classnames";
import styles from "./styles.module.scss";
import { ActiveInputField } from "desktop-app/components/common/form/active-input-field";
import { userDetails } from "desktop-app/types/userDetails";
import UpdateUserBirthdayDate from "../update-user-birthday-date";

type FormValuesType = {
  fullName: string;
};

type UserInformationEditProps = {
  userData: userDetails;
};

function UserInformationEdit({ userData }: UserInformationEditProps) {
  const { values, onChangeField } = useForm<FormValuesType>({
    initialValues: {
      fullName: userData.fullName,
    },
    onSubmit() {
      console.log("Enviado");
    },
  });
  return (
    <div className={styles.UserInformationConfigContainer}>
      <h2 className={styles.UserInformationConfigTitle}>
        Información de tu cuenta
      </h2>
      <div className={styles.ConfigOptionsSections}>
        <div>
          <UserAvatarUploader currentUserAvatar={userData.avatar} />
        </div>
        <div className={styles.ConfigOptionsPersonalData}>
          <div className={styles.GridOfInputs}>
            <ActiveInputField
              containerClass={styles.InputContainer}
              inputClass={styles.inputClass}
              labelClass={styles.labelInputFields}
              value={values.fullName}
              onChange={onChangeField}
              onClickSave={() => console.log("fullName save")}
              label="Nombre"
              name="fullName"
              showSaveButton={values.fullName !== userData.fullName}
            />

            <UpdateUserEmail email={userData.email} />
            {/* <UpdateUserPhone
              numberPhone={`+${userData.cellphoneCode} ${userData.cellphoneNumber}`}
            /> */}
            <UpdateUserBirthdayDate userBirthdayDate={userData.birthdayDate} />
          </div>
          <div className={styles.OptionsItems}>
            <UpdateUserGender gender={userData.gender} />
          </div>
        </div>
        <div className={styles.LogoutButtonWrapper}>
          <LogoutButton className={classes("btn", styles.LogoutButton)}>
            Cerrar sesión
          </LogoutButton>
        </div>
      </div>
    </div>
  );
}

export default UserInformationEdit;
