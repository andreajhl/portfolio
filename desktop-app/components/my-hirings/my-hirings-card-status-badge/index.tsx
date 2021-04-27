import {
  COMPLETED,
  EXPIRED,
  PAYED_BY_CLIENT,
  REJECTED,
} from "desktop-app/constants/contractStatuses";
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
  [PAYED_BY_CLIENT]: {
    backgroundColor: "#BFC4FF",
    icon: "far fa-clock",
    label: "Pendiente",
  },
  [REJECTED]: {
    backgroundColor: "#F6F6F6",
    icon: "far fa-times-circle",
    label: "Rechazado",
  },
  [EXPIRED]: {
    backgroundColor: "#F6F6F6",
    icon: (
      <ExclamationCircleIcon className={styles.MyHiringsCardStatusBadgeIcon} />
    ),
    label: "Expirado",
  },
  [COMPLETED]: {
    backgroundColor: "#FFDCEC",
    icon: "far fa-check-circle",
    label: "Entregado",
  },
};

statusesInfo[30] = statusesInfo[40];

function MyHiringsCardStatusBadge({ status }: MyHiringsCardStatusBadgeProps) {
  const { backgroundColor, icon, label } = statusesInfo[status] || {};

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
