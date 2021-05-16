import classes from "classnames";
import styles from "./styles.module.scss";

type DeliverVideoCardProps = {
  className?: string;
  deliveryTo: string;
};

function DeliverVideoCard({
  className = "",
  deliveryTo,
}: DeliverVideoCardProps) {
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

export { DeliverVideoCard };
