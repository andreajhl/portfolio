import { DeliveryCellphoneEditableInput } from "desktop-app/components/my-hirings/delivery-cellphone-editable-input";
import { DeliveryContactEditableInput } from "desktop-app/components/my-hirings/delivery-contact-editable-input";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import classes from "classnames";
import {
  canEditContract,
  COMPLETED,
} from "desktop-app/constants/contractStatuses";
import Maybe from "desktop-app/components/common/helpers/maybe";
import styles from "./styles.module.scss";

function InfoField({ title, value }: { title: string; value: string }) {
  return (
    <div className={styles.InfoWrapper}>
      <h4 className={styles.InfoTitle}>{title}</h4>
      <span className={styles.InfoValue}>{value}</span>
    </div>
  );
}

type MyHiringsCardNotificationInfoProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardNotificationInfo({
  contractData,
}: MyHiringsCardNotificationInfoProps) {
  const canEdit = canEditContract(contractData.status);

  const deliveryCellphone = "+52 55 4375 0949";

  return (
    <div
      className={classes(
        styles.MyHiringsCardDeliveryInfo,
        contractData.status === COMPLETED &&
          styles.MyHiringsCardDeliveryInfoCompleted
      )}
    >
      <Maybe
        it={canEdit}
        orElse={
          <>
            <InfoField
              title="Correo electrónico de notificación"
              value={contractData.deliveryContact}
            />
            <Maybe it={Boolean(deliveryCellphone)}>
              <InfoField
                title="Whatsapp de notificación"
                value={deliveryCellphone}
              />
            </Maybe>
          </>
        }
      >
        <DeliveryContactEditableInput
          deliveryContact={contractData.deliveryContact}
          className={styles.EditableInputField}
        />
        <DeliveryCellphoneEditableInput className={styles.EditableInputField} />
      </Maybe>
    </div>
  );
}

export { MyHiringsCardNotificationInfo };
