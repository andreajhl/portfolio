import styles from "./styles.module.scss";
import { ReactNode } from "react";

type SubmitButtonProps = {
  onClick?: () => void;
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
