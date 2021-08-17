import styles from "./styles.module.scss";
import { ComponentPropsWithRef } from "react";
import classes from "classnames";
import { LoadingSpinner } from "../../loading-spinner";

type SubmitButtonProps = {
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "tertiary";
} & ComponentPropsWithRef<"button">;

function SubmitButton({
  children = "Guardar",
  type = "submit",
  className,
  loading,
  variant = "primary",
  ...props
}: SubmitButtonProps) {
  const getClassNameButton = () => {
    if (variant === "primary") {
      return "btn-primary";
    }
    if (variant === "secondary") {
      return "btn-secondary";
    }
    if (variant === "tertiary") {
      return "btn-tertiary";
    }
    if (variant === "danger") {
      return "btn-tertiary";
    }
  };
  return (
    <button
      type={type}
      className={classes(
        `btn ${getClassNameButton()}`,
        styles.SubmitButton,
        className
      )}
      {...props}
    >
      {children}{" "}
      {loading && (
        <LoadingSpinner
          cssStyle={{
            marginLeft: "10px",
          }}
        />
      )}
    </button>
  );
}

export default SubmitButton;
