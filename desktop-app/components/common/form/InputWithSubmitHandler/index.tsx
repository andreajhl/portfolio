import styles from "./styles.module.scss";
type InputWithSubmitHandlerProps = {
  className?: string;
  btnType?: string;
  style?: object;
  placeHolderInput: string;
  placeHolderButton: string;
  setInputValue?: (value: string) => void;
  inputValue?: string;
  onSubmit?: () => void;
};
const InputWithSubmitHandler = ({
  className = "",
  placeHolderInput,
  style,
  btnType = "btn-primary",
  placeHolderButton,
  setInputValue = () => {},
  inputValue = "",
  onSubmit = () => {}
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
