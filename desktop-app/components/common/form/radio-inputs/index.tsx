import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

type OptionProps = {
  _type?: never;
  descriptionForScreenReaders?: ReactNode;
  children: ReactNode;
  checked?: boolean;
  name?: string;
  selectedClassName?: string;
} & Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "id" | "onChange"
>;

function Option({
  value,
  id,
  checked = false,
  name,
  descriptionForScreenReaders = null,
  children,
  selectedClassName = "selected",
  onChange,
}: OptionProps) {
  return (
    <>
      <input
        value={value}
        id={id}
        checked={checked}
        type="radio"
        name={name}
        className={styles.VisuallyHidden}
        onChange={onChange}
      />
      <label htmlFor={id} className={checked ? selectedClassName : ""}>
        <span className={styles.VisuallyHidden}>
          {descriptionForScreenReaders}
        </span>
        {children}
      </label>
    </>
  );
}

type RadioInputsProps = {
  children: ReactNode;
  name?: string;
  onChange?: (value: any) => void;
  value?: any;
};

function RadioInputs({
  name = "Radio-Inputs- " + Date.now(),
  children,
  onChange = function () {},
  value = null,
}: RadioInputsProps) {
  return (
    <div className={styles.RadioInputs}>
      {React.Children.map(children, (child) => {
        const childProps = (child as any)?.props;
        return (
          React.Children.only(child) &&
          React.cloneElement(
            child as any,
            Object.assign(
              {
                name,
                checked: value === childProps?.value,
                onChange: (event) => {
                  const newValue = event.target.value;
                  onChange(newValue);
                },
              },
              childProps
            )
          )
        );
      })}
    </div>
  );
}

RadioInputs.Option = Option;

export { RadioInputs };
