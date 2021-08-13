import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

type ContractInstructionTextareaProps = {
  containerClass?: string;
  labelClass?: string;
  textareaClass?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function ContractInstructionsTextarea({
  containerClass = "",
  labelClass = "",
  className = "",
  textareaClass = className,
  id = "ContractInstructionsTextarea",
  ...textareaProps
}: ContractInstructionTextareaProps) {
  return (
    <div className={`${styles.ContractInstructionTextarea} ${containerClass}`}>
      <label
        className={`${styles.ContractInstructionsLabel} ${labelClass}`}
        htmlFor={id}
      >
        <FormattedMessage defaultMessage="Instrucciones" />
      </label>
      <textarea
        id={id}
        className={`${styles.ContractInstructionsTextarea} ${textareaClass}`}
        maxLength={400}
        {...textareaProps}
      />
    </div>
  );
}

export { ContractInstructionsTextarea };
