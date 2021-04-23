import { ReactNode } from "react";
import Maybe from "../../common/helpers/maybe";
import { ExclamationCircleIcon } from "../../common/icons";
import styles from "./styles.module.scss";

type MyHiringsCardStatusBadgeProps = {
  status: number;
};

type StatusInfoType = {
  backgroundColor: string;
  icon: string | ReactNode;
  label: string;
};

const statusesInfo: { [statusCode: number]: StatusInfoType } = {
  40: {
    backgroundColor: "#FFDCEC",
    icon: "far fa-check-circle",
    label: "Entregado"
  },
  10: {
    backgroundColor: "#BFC4FF",
    icon: "far fa-clock",
    label: "Pendiente"
  },
  20: {
    backgroundColor: "#F6F6F6",
    icon: "far fa-times-circle",
    label: "Rechazado"
  },
  25: {
    backgroundColor: "#F6F6F6",
    icon: (
      <ExclamationCircleIcon className={styles.MyHiringsCardStatusBadgeIcon} />
    ),
    label: "Expirado"
  }
};

statusesInfo[30] = statusesInfo[40];

function MyHiringsCardStatusBadge({ status }: MyHiringsCardStatusBadgeProps) {
  const { backgroundColor, icon, label } = statusesInfo[status];

  return (
    <span
      className={styles.MyHiringsCardStatusBadge}
      style={{ backgroundColor }}
    >
      <Maybe it={typeof icon === "string"} orElse={icon}>
        <i className={`${styles.MyHiringsCardStatusBadgeIcon} ${icon}`} />
      </Maybe>
      {label}
    </span>
  );
}

export { MyHiringsCardStatusBadge };
