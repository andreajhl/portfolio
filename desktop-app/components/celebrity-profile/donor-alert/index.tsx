import { celebrityType } from "desktop-app/types/celebrityType";
import styles from "./styles.module.scss";

type DonorAlertProps = Pick<celebrityType, "fullName" | "causeName">;

function DonorAlert({ fullName, causeName }: DonorAlertProps) {
  return (
    <div className={styles.DonorAlert}>
      <img src="/assets/img/donor-icon.png" alt="Corazón" />
      <p>
        {fullName} dona de sus ingresos a: {causeName}
      </p>
    </div>
  );
}

export { DonorAlert };
