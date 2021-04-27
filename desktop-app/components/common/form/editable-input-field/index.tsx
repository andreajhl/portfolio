import { EditingToggleButton } from "../../button/editing-toggle-button";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { InputField } from "../input-field";

type EditableInputFieldProps = {
  id?: string;
  label: string;
  InputComponent?:
    | string
    | ((props: React.InputHTMLAttributes<HTMLInputElement>) => JSX.Element);
  containerClass?: string;
  inputClass?: string;
  labelClass?: string;
  initialIsEditing?: boolean;
  onClickSave?: (setIsEditing: Dispatch<SetStateAction<boolean>>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

function EditableInputField({
  id = `EditableInputField-${Date.now()}`,
  InputComponent = InputField,
  label,
  className = "",
  containerClass = className,
  inputClass = "",
  labelClass,
  initialIsEditing = false,
  onClickSave = function () {},
  ...inputProps
}: EditableInputFieldProps) {
  const [isEditing, setIsEditing] = useState(initialIsEditing);

  return (
    <div className={classes(styles.EditableInputField, containerClass)}>
      <div>
        <label htmlFor={id} className={classes(styles.Label, labelClass)}>
          {label}
        </label>
        <InputComponent
          type="text"
          id={id}
          disabled={!isEditing}
          className={classes(styles.Input, inputClass)}
          {...inputProps}
        />
      </div>
      <div
        className={classes(
          !isEditing
            ? styles.EditingButtonWrapperRight
            : styles.EditingButtonWrapperBottom
        )}
      >
        <EditingToggleButton
          removeSaveButtonPadding
          isEditing={isEditing}
          editButtonColor="var(--secondary)"
          saveButtonColor="var(--secondary)"
          onClickEdit={() => setIsEditing((isEditing) => !isEditing)}
          onClickSave={() => {
            onClickSave(setIsEditing);
          }}
        />
      </div>
    </div>
  );
}

export { EditableInputField };
