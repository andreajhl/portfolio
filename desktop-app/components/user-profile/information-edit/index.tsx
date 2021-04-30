import { EditableInputField } from "desktop-app/components/common/form/editable-input-field";
import PhotoUploader from "desktop-app/components/common/photo-uploader";
import TriggerPopupEditButton from "desktop-app/components/common/trigger-popup-edit-button";
import useForm from "lib/hooks/useForm";
import React from "react";
import UpdateUserEmail from "../update-user-email";
import styles from "./styles.module.scss";
type FormValuesType = {
  fullName: string;
  cellphoneNumber: string | number;
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
          <PhotoUploader />
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
            <EditableInputField
              inputClass={styles.inputClass}
              labelClass={styles.labelInputFields}
              value={values.fullName}
              label="Nombre"
              onClickSave={(setIsEditing) =>
                setIsEditing((isEditing) => !isEditing)
              }
              name="fullName"
            ></EditableInputField>
            <EditableInputField
              inputClass={styles.inputClass}
              labelClass={styles.labelInputFields}
              value={values.fullName}
              label="Nombre"
              onClickSave={(setIsEditing) =>
                setIsEditing((isEditing) => !isEditing)
              }
              name="fullName"
            ></EditableInputField>
          </div>
          <div className={styles.OptionsItems}>
            <span>Genero</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInformationEdit;
