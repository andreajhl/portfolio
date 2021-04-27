import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import classes from "classnames";
import "react-phone-input-2/lib/style.css";
import styles from "./styles.module.scss";

type CellphoneNumberInputProps = {
  hasError?: boolean;
} & PhoneInputProps;

function CellphoneNumberInput({
  hasError = false,
  containerClass,
  inputClass,
  buttonClass,
  searchClass,
  dropdownClass,
  ...props
}: CellphoneNumberInputProps) {
  return (
    <PhoneInput
      containerClass={classes(
        containerClass,
        styles.ContainerPhoneInput,
        hasError && styles.FormFieldHasError
      )}
      inputClass={classes(
        inputClass,
        styles.InputClassPhoneInput,
        hasError && styles.FormFieldHasError
      )}
      buttonClass={classes(
        buttonClass,
        styles.ButtonClassPhoneInput,
        hasError && styles.FormFieldHasError
      )}
      searchClass={classes(searchClass, styles.SearchClassPhoneInput)}
      dropdownClass={classes(dropdownClass, styles.DropdownClassPhoneInput)}
      {...props}
    />
  );
}

export { CellphoneNumberInput };
