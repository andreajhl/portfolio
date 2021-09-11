import { celebrityType } from "desktop-app/types/celebrityType";
import { FormattedMessage } from "react-intl";
import classes from "classnames";
import styles from "./styles.module.scss";

type DonorAlertProps = { className?: string } & Pick<
  celebrityType,
  "fullName" | "causeName"
>;

function DonorAlert({ className, fullName, causeName }: DonorAlertProps) {
  return (
    <div className={classes(styles.DonorAlert, className)}>
      <img src="/assets/img/donor-icon.png" alt="Donor icon" />
      <p>
        <FormattedMessage
          defaultMessage="{fullName} dona de sus ingresos a: {causeName}"
          values={{ fullName, causeName }}
        />
      </p>
    </div>
  );
}

export { DonorAlert };
