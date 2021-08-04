import { EditingToggleButton } from "../../button/editing-toggle-button";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useState } from "react";
import { InputField } from "../input-field";
import Maybe from "../../helpers/maybe";
import { FormattedMessage } from "react-intl";

type ActiveInputFieldProps = {
  id?: string;
  label: string;
  InputComponent?:
    | string
    | ((props: React.InputHTMLAttributes<HTMLInputElement>) => JSX.Element);
  containerClass?: string;
  inputClass?: string;
  labelClass?: string;
  initialIsEditing?: boolean;
  saveButtonColor?: string;
  showSaveButton: boolean;
  onClickSave: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

function ActiveInputField({
  id = `ActiveInputField-${Date.now()}`,
  InputComponent = InputField,
  label,
  className = "",
  containerClass = className,
  inputClass = "",
  labelClass,
  initialIsEditing = false,
  saveButtonColor = "var(--secondary)",
  showSaveButton,
  onClickSave = function () {},
  ...inputProps
}: ActiveInputFieldProps) {
  return (
    <div className={classes(styles.EditableInputField, containerClass)}>
      <div>
        <label htmlFor={id} className={classes(styles.Label, labelClass)}>
          {label}
        </label>
        <InputComponent
          type="text"
          id={id}
          className={classes(styles.Input, inputClass)}
          {...inputProps}
        />
      </div>
      <Maybe it={showSaveButton}>
        <div className={classes(styles.EditingButtonWrapperRight)}>
          <button
            className={`btn ${styles.EditingToggleButtonSaveButton}`}
            onClick={() => onClickSave()}
            style={{ color: saveButtonColor }}
          >
            <FormattedMessage defaultMessage="Guardar" />
          </button>
        </div>
      </Maybe>
    </div>
  );
}

export { ActiveInputField };
