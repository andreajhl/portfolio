import { CheckIcon } from "desktop-app/components/common/check-icon";
import Checkbox from "desktop-app/components/common/form/checkbox";
import { LoadingSpinner } from "desktop-app/components/common/loading-spinner";
import { SubmitStatus } from "desktop-app/components/common/submit-status";
import useStatus from "lib/hooks/useStatus";
import React, { useState } from "react";
import styles from "./styles.module.scss";

type genders = "male" | "female";
type UpdateUserGenderProps = {
  gender: genders;
};
function UpdateUserGender({ gender }: UpdateUserGenderProps) {
  const [status, setStatus] = useStatus("idle");
  const [currentgenderSelect, setCurrentgenderSelect] = useState(gender);
  const handlegenderChange = (gender: genders) => {
    setCurrentgenderSelect(gender);
  };
  return (
    <div className={styles.UpdateUserGenderWrapper}>
      <Checkbox
        alignLabel="left"
        label="Hombre"
        onChange={(e) => handlegenderChange("male")}
        value="male"
        checked={currentgenderSelect === "male"}
        name="male"
        checkboxLayout="circle"
        className={styles.Checkbox}
      ></Checkbox>
      <Checkbox
        alignLabel="left"
        label="Mujer"
        onChange={(e) => handlegenderChange("female")}
        value="female"
        checked={currentgenderSelect === "female"}
        name="female"
        checkboxLayout="circle"
        className={styles.Checkbox}
      ></Checkbox>
      <div className={styles.SubmitIcon}>
        <SubmitStatus status={status} />
      </div>
    </div>
  );
}

export default UpdateUserGender;
