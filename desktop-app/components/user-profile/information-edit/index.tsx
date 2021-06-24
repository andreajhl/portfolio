import { EditableInputField } from "desktop-app/components/common/form/editable-input-field";
import useForm from "lib/hooks/useForm";
import React from "react";
import UpdateUserEmail from "../update-user-email";
import { UserAvatarUploader } from "../user-avatar-uploader";
import UpdateUserPhone from "../update-user-phonenumber";
import UpdateUserGender from "../update-user-gender";
import LogoutButton from "react-app/src/components/containers/logout-button/logout-button";
import classes from "classnames";
import styles from "./styles.module.scss";
import { ActiveInputField } from "desktop-app/components/common/form/active-input-field";
import { userDetails } from "desktop-app/types/userDetails";
type FormValuesType = {
  fullName: string;
  birthdayDate: string;
  gender: string;
};

type UserInformationEditProps = {
  userData: userDetails;
};

function UserInformationEdit({ userData }: UserInformationEditProps) {
  const { values, onChangeField } = useForm<FormValuesType>({
    initialValues: {
      fullName: userData.fullName,
      gender: userData.gender,
      birthdayDate: userData.birthdayDate,
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
            <ActiveInputField
              containerClass={styles.InputContainer}
              inputClass={styles.inputClass}
              labelClass={styles.labelInputFields}
              value={values.birthdayDate}
              label="Fecha de nacimiento"
              type="date"
              name="birthdayDate"
              onClickSave={() => console.log("birthdayDate save")}
              showSaveButton={values.birthdayDate !== userData.birthdayDate}
            />
          </div>
          <div className={styles.OptionsItems}>
            <UpdateUserGender gender={"male"} />
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
