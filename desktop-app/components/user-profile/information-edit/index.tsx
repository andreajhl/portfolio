import { EditableInputField } from "desktop-app/components/common/form/editable-input-field";
import PhotoUploader from "desktop-app/components/common/photo-uploader";
import useForm from "lib/hooks/useForm";
import React from "react";
import UpdateUserEmail from "../update-user-email";
import { UserAvatarUploader } from "../user-avatar-uploader";
import UpdateUserPhone from "../update-user-phonenumber";
import styles from "./styles.module.scss";
import UpdateUserGender from "../update-user-gender";

type FormValuesType = {
  fullName: string;
  cellphoneNumber: string;
  avatar: string;
  email: string;
  birthdayDate: string;
  gender: string;
};

function UserInformationEdit() {
  const { values, onChangeField } = useForm<FormValuesType>({
    initialValues: {
      fullName: "Isaac",
      avatar: "",
      gender: "Masculino",
      email: "uncorreomuylargodelusuario.pr99@gmail.com",
      cellphoneNumber: "04245902830",
      birthdayDate: "27/23/2012",
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
          <UserAvatarUploader />
        </div>
        <div className={styles.ConfigOptionsPersonalData}>
          <div className={styles.OptionsItems}>
            <EditableInputField
              inputClass={styles.inputClass}
              labelClass={styles.labelInputFields}
              value={values.fullName}
              onChange={onChangeField}
              label="Nombre"
              onClickSave={(setIsEditing) =>
                setIsEditing((isEditing) => !isEditing)
              }
              name="fullName"
            ></EditableInputField>
            <UpdateUserEmail email={values.email} />
          </div>
          <div className={styles.OptionsItems}>
            <UpdateUserPhone numberPhone={values.cellphoneNumber} />
            <EditableInputField
              inputClass={styles.inputClass}
              labelClass={styles.labelInputFields}
              value={values.birthdayDate}
              label="Fecha de nacimiento"
              onClickSave={(setIsEditing) =>
                setIsEditing((isEditing) => !isEditing)
              }
              name="birthdayDate"
            ></EditableInputField>
          </div>
          <div className={styles.OptionsItems}>
            <UpdateUserGender gender={"male"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInformationEdit;
