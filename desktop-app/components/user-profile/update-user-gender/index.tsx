import { CheckIcon } from "desktop-app/components/common/check-icon";
import Checkbox from "desktop-app/components/common/form/checkbox";
import { LoadingSpinner } from "desktop-app/components/common/loading-spinner";
import { SubmitStatus } from "desktop-app/components/common/submit-status";
import { userDetails } from "desktop-app/types/userDetails";
import useStatus from "lib/hooks/useStatus";
import React, { useState } from "react";
import { updateUserGender } from "react-app/src/state/ducks/account/actions";
import { defineMessages, useIntl } from "react-intl";
import styles from "./styles.module.scss";

type UpdateUserGenderProps = Pick<userDetails, "gender">;

const messages = defineMessages({
  checkboxMaleLabel: {
    defaultMessage: "Hombre",
  },
  checkboxWomanLabel: {
    defaultMessage: "Mujer",
  },
});

function UpdateUserGender({ gender }: UpdateUserGenderProps) {
  const [status, setStatus] = useStatus("idle");
  const { formatMessage } = useIntl();
  const [currentgenderSelect, setCurrentgenderSelect] = useState(gender);
  const handlegenderChange = async ({ gender }: UpdateUserGenderProps) => {
    setCurrentgenderSelect(gender);
    setStatus("loading");
    updateUserGender(gender).then((_) => {
      setStatus("completed");
    });
  };
  return (
    <div className={styles.UpdateUserGenderWrapper}>
      <Checkbox
        alignLabel="left"
        label={formatMessage(messages.checkboxMaleLabel)}
        onChange={(e) => handlegenderChange({ gender: "male" })}
        value="male"
        checked={currentgenderSelect === "male"}
        name="male"
        checkboxLayout="circle"
        className={styles.Checkbox}
      ></Checkbox>
      <Checkbox
        alignLabel="left"
        label={formatMessage(messages.checkboxWomanLabel)}
        onChange={(e) => handlegenderChange({ gender: "female" })}
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
