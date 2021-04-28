import { DeliveryCellphoneEditableInput } from "desktop-app/components/my-hirings/delivery-cellphone-editable-input";
import { DeliveryContactEditableInput } from "desktop-app/components/my-hirings/delivery-contact-editable-input";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import classes from "classnames";
import { COMPLETED } from "desktop-app/constants/contractStatuses";
import styles from "./styles.module.scss";

type MyHiringsCardNotificationInfoProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardNotificationInfo({
  contractData,
}: MyHiringsCardNotificationInfoProps) {
  return (
    <div
      className={classes(
        styles.MyHiringsCardDeliveryInfo,
        contractData.status === COMPLETED && styles.MyHiringsCardDeliveryInfoCompleted
      )}
    >
      <DeliveryContactEditableInput
        deliveryContact={contractData.deliveryContact}
        className={styles.EditableInputField}
      />
      <DeliveryCellphoneEditableInput className={styles.EditableInputField} />
    </div>
  );
}

export { MyHiringsCardNotificationInfo };
