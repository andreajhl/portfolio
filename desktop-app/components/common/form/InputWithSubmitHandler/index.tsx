import { ReactNode } from "react";
import styles from "./styles.module.scss";
type InputWithSubmitHandlerProps = {
  className?: string;
  btnType?: string;
  style?: object;
  placeHolderInput: string;
  placeHolderButton: string | ReactNode;
  setInputValue?: (value: string) => void;
  inputValue?: string;
  onSubmit?: () => void;
  inputID?: string;
  inputName?: string;
};
const InputWithSubmitHandler = ({
  className = "",
  placeHolderInput,
  style,
  btnType = "btn-primary",
  placeHolderButton,
  setInputValue = () => {},
  inputValue = "",
  onSubmit = () => {},
  inputName,
  inputID,
}: InputWithSubmitHandlerProps) => {
  return (
    <div
      style={{ ...style }}
      className={`${styles.InputWithSubmitHandler} ${className}`}
    >
      <input
        className={styles.Input}
        placeholder={placeHolderInput}
        value={inputValue}
        name={inputName}
        id={inputID}
        onKeyUp={(event) => {
          if (event.key === "Enter") onSubmit();
        }}
        onChange={({ target: { value } }) => setInputValue(value)}
      />
      <button
        className={`btn ${btnType} ${styles.SubmitButton}`}
        onClick={onSubmit}
      >
        {placeHolderButton}
      </button>
    </div>
  );
};

export default InputWithSubmitHandler;
