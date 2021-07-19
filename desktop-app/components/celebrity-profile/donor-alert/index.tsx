import { celebrityType } from "desktop-app/types/celebrityType";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

type DonorAlertProps = Pick<celebrityType, "fullName" | "causeName">;

function DonorAlert({ fullName, causeName }: DonorAlertProps) {
  return (
    <div className={styles.DonorAlert}>
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
