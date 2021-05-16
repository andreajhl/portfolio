import classes from "classnames";
import styles from "./styles.module.scss";

type ShareGiftDropdownProps = {
  className?: string;
  deliveryTo: string;
  deliveryFrom: string;
  contractReference: string;
};

function ShareGiftDropdown({
  className = "",
  deliveryTo,
}: ShareGiftDropdownProps) {
  return (
    <button
      type="button"
      className={classes(
        "btn btn-secondary text-with-ellipsis",
        styles.CTAButton,
        className
      )}
    >
      Enviar video a {deliveryTo}
    </button>
  );
}

export { ShareGiftDropdown };
