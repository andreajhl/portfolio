import styles from "./styles.module.scss";
type InputWithSubmitHandlerProps = {
  className?: string;
  placeHolderInput: string;
  btnType?: string;
};
const InputWithSubmitHandler = ({
  className = "",
  placeHolderInput,
  btnType = "btn-primary"
}: InputWithSubmitHandlerProps) => {
  return (
    <div className={`${styles.InputWithSubmitHandler} ${className}`}>
      <input className={styles.Input} placeholder={placeHolderInput}></input>
      <button className={`btn ${btnType} ${styles.SubmitButton}`}>
        Suscribirme
      </button>
    </div>
  );
};

export default InputWithSubmitHandler;
