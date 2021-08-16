import styles from "./styles.module.scss";
import { ComponentPropsWithRef } from "react";
import classes from "classnames";
import { LoadingSpinner } from "../../loading-spinner";

type SubmitButtonProps = {
  loading?: boolean;
} & ComponentPropsWithRef<"button">;

function SubmitButton({
  children = "Guardar",
  type = "submit",
  className,
  loading,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      className={classes("btn btn-primary", styles.SubmitButton, className)}
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
