import styles from "./styles.module.scss";
import { ReactNode, MouseEvent } from "react";

type SubmitButtonProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

function SubmitButton({
  onClick = function () {},
  children = "Guardar"
}: SubmitButtonProps) {
  return (
    <button
      type="button"
      className={"btn btn-primary " + styles.SubmitButton}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
