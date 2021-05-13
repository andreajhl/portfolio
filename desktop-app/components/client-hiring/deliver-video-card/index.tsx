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
    <div className={classes(styles.DeliverVideoCard, className)}>
      <button
        type="button"
        className={classes(
          "btn btn-secondary text-with-ellipsis",
          styles.CTAButton
        )}
      >
        Enviar video a {deliveryTo}
      </button>
    </div>
  );
}

export { DeliverVideoCard };
