import Checkbox from "desktop-app/components/common/form/checkbox";
import React, { useState } from "react";
import styles from "./styles.module.scss";
type genders = "male" | "female";
type UpdateUserGenderProps = {
  gener: genders;
};
function UpdateUserGender({ gener }: UpdateUserGenderProps) {
  const [currentGenerSelect, setCurrentGenerSelect] = useState(gener);
  const handleGenerChange = (gener: genders) => {
    setCurrentGenerSelect(gener);
  };
  return (
    <div className={styles.UpdateUserGenderWrapper}>
      <Checkbox
        alignLabel="left"
        label="Hombre"
        onChange={(e) => handleGenerChange("male")}
        value="male"
        checked={currentGenerSelect === "male"}
        name="male"
        checkboxLayout="circle"
        className={styles.Checkbox}
      ></Checkbox>
      <Checkbox
        alignLabel="left"
        label="Mujer"
        onChange={(e) => handleGenerChange("female")}
        value="female"
        checked={currentGenerSelect === "female"}
        name="female"
        checkboxLayout="circle"
        className={styles.Checkbox}
      ></Checkbox>
    </div>
  );
}

export default UpdateUserGender;
