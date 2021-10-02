import InputWithSubmitHandler, {
  InputWithSubmitHandlerProps,
} from "../InputWithSubmitHandler";
import styles from "./styles.module.scss";
import classes from "classnames";

function ContractDataStarInput({
  hasError,
  ...props
}: { hasError?: boolean } & InputWithSubmitHandlerProps) {
  return (
    <InputWithSubmitHandler
      className={classes(styles.containerstar, hasError && styles.HasError)}
      type="number"
      {...props}
    />
  );
}

export { ContractDataStarInput };
