import { EditableInputField } from "desktop-app/components/common/form/editable-input-field";
import Maybe from "desktop-app/components/common/helpers/maybe";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useState } from "react";
import { EditableInputEmpty } from "desktop-app/components/common/form/editable-input-empty";
import { DeliveryCellphoneInput } from "desktop-app/components/my-hirings/delivery-cellphone-input";

type DeliveryCellphoneEditableInputProps = {
  className?: string;
  onSave?: (value: string) => void;
};

const label = "Whatsapp de notificación (opcional)";

function DeliveryCellphoneEditableInput({
  className = "",
  onSave = function () {},
}: DeliveryCellphoneEditableInputProps) {
  const [value, setValue] = useState("57");
  const [hasDeliveryCellphone, setHasDeliveryCellphone] = useState(false);

  function setInputValue(newValue) {
    setValue(newValue);
  }

  return (
    <Maybe
      it={hasDeliveryCellphone}
      orElse={
        <EditableInputEmpty
          label={label}
          className={classes(styles.EditableInputEmpty, className)}
          onClickButton={() => setHasDeliveryCellphone(true)}
        />
      }
    >
      <EditableInputField
        value={value}
        onChange={setInputValue}
        className={className}
        label={label}
        initialIsEditing={true}
        onClickSave={(setIsEditing) => {
          setIsEditing(false);
          onSave?.(value);
        }}
        InputComponent={DeliveryCellphoneInput}
      />
    </Maybe>
  );
}

export { DeliveryCellphoneEditableInput };
