import {
  COMPLETED,
  contractIsCancelled,
} from "desktop-app/constants/contractStatuses";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import Maybe from "../../common/helpers/maybe";
import { MyHiringsCardStatusBadge } from "../my-hirings-card-status-badge";
import getValidDate from "../../../../lib/utils/getValidDate";
import classes from "classnames";
import styles from "./styles.module.scss";
import getFormattedDate from "../../../../lib/utils/getFormattedDate";
import { FormattedMessage } from "react-intl";

type MyHiringsCardHeaderProps = {
  contractData: MyHiringsContract;
};

function getExpectedDeliveryDate(paymentDate) {
  const dateObject = getValidDate(paymentDate);
  const currentDay = dateObject.getDate();
  const maxDaysToDeliver = 7;
  dateObject.setDate(currentDay + maxDaysToDeliver);
  return dateObject;
}

function MyHiringsCardHeader({ contractData }: MyHiringsCardHeaderProps) {
  const contractIsCompleted = contractData.status === COMPLETED;
  const contractRecordingDate = contractIsCompleted
    ? contractData.recordingDate
    : getExpectedDeliveryDate(contractData.paymentDate);

  return (
    <header className={styles.MyHiringsCardHeader}>
      <div className={styles.MyHiringsCardHeaderContainer}>
        <div className={styles.MyHiringsCardHeaderHeading}>
          <h2>
            <FormattedMessage
              defaultMessage="Video personalizado de {contractData}"
              values={{
                contractData: contractData.celebrityData.fullName,
              }}
            />
          </h2>
          <MyHiringsCardStatusBadge status={contractData.status} />
        </div>
        <div
          className={classes(
            styles.MyHiringsCardHeaderInfo,
            contractIsCancelled(contractData.status) &&
              styles.MyHiringsCardHeaderInfoDisabled
          )}
        >
          <span>
            <FormattedMessage defaultMessage="Fecha de solicitud:" />{" "}
            {getFormattedDate(contractData.paymentDate)}
          </span>
          <span>
            <Maybe
              it={contractIsCompleted}
              orElse={
                <FormattedMessage defaultMessage="Fecha estimada de grabación:" />
              }
            >
              <FormattedMessage defaultMessage="Fecha de grabación:" />
            </Maybe>{" "}
            {getFormattedDate(contractRecordingDate)}
          </span>
          <span>
            <FormattedMessage defaultMessage="ID de seguimiento:" />{" "}
            {contractData.reference}
          </span>
        </div>
      </div>
    </header>
  );
}

export { MyHiringsCardHeader };
