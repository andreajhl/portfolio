import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import classes from "classnames";

type CardGenerationReminderProps = {
  className?: string;
};

function CardGenerationReminder({ className }: CardGenerationReminderProps) {
  return (
    <p className={classes(styles.CardGenerationReminder, className)}>
      <i className="fa fa-info-circle" />{" "}
      <FormattedMessage defaultMessage="Recuerda generar tu tarjeta digital en tu Banca Móvil." />
    </p>
  );
}

export { CardGenerationReminder };
