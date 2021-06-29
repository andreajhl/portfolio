import React from "react";
import { ActiveInputField } from "desktop-app/components/common/form/active-input-field";
import { SubmitStatus } from "desktop-app/components/common/submit-status";
import styles from "./styles.module.scss";
import useForm from "lib/hooks/useForm";
import moment from "moment";
import useStatus from "lib/hooks/useStatus";
import { updateUserBirthdayDate } from "react-app/src/state/ducks/account/actions";

type FormValuesType = {
  birthdayDate: string;
};

type UpdateUserBirthdayDateProps = {
  userBirthdayDate: string;
};
function UpdateUserBirthdayDate({
  userBirthdayDate,
}: UpdateUserBirthdayDateProps) {
  const [status, setStatus] = useStatus("idle");
  const handleBirthdayDateChange = async (birthdayDate) => {
    setStatus("loading");
    updateUserBirthdayDate(new Date(birthdayDate).toISOString()).then((_) => {
      setStatus("completed");
    });
  };
  const { values, onChangeField } = useForm<FormValuesType>({
    initialValues: {
      birthdayDate: moment(userBirthdayDate).format("yyyy-MM-dd"),
    },
    onSubmit() {
      console.log("Enviado");
    },
  });
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", right: "-10%", top: "50%" }}>
        <SubmitStatus status={status} />
      </div>
      <ActiveInputField
        containerClass={styles.InputContainer}
        inputClass={styles.inputClass}
        labelClass={styles.labelInputFields}
        value={values.birthdayDate}
        label="Fecha de nacimiento"
        type="date"
        name="birthdayDate"
        onChange={onChangeField}
        onClickSave={() => handleBirthdayDateChange(values.birthdayDate)}
        showSaveButton={values.birthdayDate !== userBirthdayDate}
      />
    </div>
  );
}

export default UpdateUserBirthdayDate;
