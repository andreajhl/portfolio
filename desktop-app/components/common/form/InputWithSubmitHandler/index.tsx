import styles from "./styles.module.scss";
type InputWithSubmitHandlerProps = {
  className?: string;
  btnType?: string;
  style?: object;
  placeHolderInput: string;
  placeHolderButton: string;
};
const InputWithSubmitHandler = ({
  className = "",
  placeHolderInput,
  style,
  btnType = "btn-primary",
  placeHolderButton
}: InputWithSubmitHandlerProps) => {
  return (
    <div
      style={{ ...style }}
      className={`${styles.InputWithSubmitHandler} ${className}`}
    >
      <input className={styles.Input} placeholder={placeHolderInput}></input>
      <button className={`btn ${btnType} ${styles.SubmitButton}`}>
        {placeHolderButton}
      </button>
    </div>
  );
};

export default InputWithSubmitHandler;
