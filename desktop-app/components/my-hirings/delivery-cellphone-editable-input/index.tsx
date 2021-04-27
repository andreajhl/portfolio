import { EditableInputField } from "desktop-app/components/common/form/editable-input-field";
import Maybe from "desktop-app/components/common/helpers/maybe";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useState } from "react";
import { EditableInputEmpty } from "desktop-app/components/common/form/editable-input-empty";

type DeliveryCellphoneEditableInputProps = {
  className?: string;
};

const label = "Whatsapp de notificación (opcional)";

function DeliveryCellphoneEditableInput({
  className = "",
  deliveryContactCellphone,
}: DeliveryCellphoneEditableInputProps) {
  const [hasDeliveryCellphone, setHasDeliveryCellphone] = useState(false);
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
        className={className}
        label={label}
        initialIsEditing={true}
      />
    </Maybe>
  );
}

export { DeliveryCellphoneEditableInput };
