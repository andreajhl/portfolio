import InputWithSubmitHandler, {
  InputWithSubmitHandlerProps,
} from "../InputWithSubmitHandler";
import styles from "./styles.module.scss";

function ContractDataStarInput(props: InputWithSubmitHandlerProps) {
  return (
    <InputWithSubmitHandler
      className={styles.containerstar}
      type="number"
      {...props}
    />
  );
}

export { ContractDataStarInput };
