import styles from "./styles.module.scss";
type InputWithSubmitHandlerProps = {
  className?: string;
  btnType?: string;
};
const InputWithSubmitHandler = ({
  className = "",
  btnType = "btn-primary"
}: InputWithSubmitHandlerProps) => {
  return (
    <div className={`${styles.InputWithSubmitHandler} ${className}`}>
      <input className={styles.Input} placeholder={"E-mail"}></input>
      <button className={`btn ${btnType} ${styles.SubmitButton}`}>
        Suscribirme
      </button>
    </div>
  );
};

export default InputWithSubmitHandler;
