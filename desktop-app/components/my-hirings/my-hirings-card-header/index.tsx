import MyHiringsContract from "desktop-app/types/myHiringsContract";
import Maybe from "../../common/helpers/maybe";
import { MyHiringsCardStatusBadge } from "../my-hirings-card-status-badge";
import getValidDate from "./getValidDate";
import styles from "./styles.module.scss";

type MyHiringsCardHeaderProps = {
  contractData: MyHiringsContract;
};

function getFormattedDate(date) {
  const dateObject = getValidDate(date);
  const monthString = dateObject.toLocaleDateString("es", {
    month: "short"
  });
  return [dateObject.getDate(), monthString, dateObject.getFullYear()].join(
    "/"
  );
}

function getExpectedDeliveryDate(paymentDate) {
  const dateObject = getValidDate(paymentDate);
  const currentDay = dateObject.getDate();
  const maxDaysToDeliver = 7;
  dateObject.setDate(currentDay + maxDaysToDeliver);
  return dateObject;
}

const COMPLETED_STATUS = 40;

function MyHiringsCardHeader({ contractData }: MyHiringsCardHeaderProps) {
  return (
    <header className={styles.MyHiringsCardHeader}>
      <div className={styles.MyHiringsCardHeaderContainer}>
        <div className={styles.MyHiringsCardHeaderHeading}>
          <h2>Video personalizado de {contractData.celebrityData.fullName}</h2>
          <MyHiringsCardStatusBadge status={contractData.status} />
        </div>
        <div className={styles.MyHiringsCardHeaderInfo}>
          <span>
            Fecha de solicitud: {getFormattedDate(contractData.paymentDate)}
          </span>
          <span>
            <Maybe
              it={contractData.status === COMPLETED_STATUS}
              orElse={"Fecha estimada de grabación:"}
            >
              Fecha de grabación:
            </Maybe>{" "}
            {getFormattedDate(
              getExpectedDeliveryDate(contractData.paymentDate)
            )}
          </span>
          <span>ID de seguimiento: {contractData.reference}</span>
        </div>
      </div>
    </header>
  );
}

export { MyHiringsCardHeader };
