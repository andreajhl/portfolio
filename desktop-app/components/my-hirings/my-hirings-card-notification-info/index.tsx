import { DeliveryCellphoneEditableInput } from "desktop-app/components/my-hirings/delivery-cellphone-editable-input";
import { DeliveryContactEditableInput } from "desktop-app/components/my-hirings/delivery-contact-editable-input";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import styles from "./styles.module.scss";

type MyHiringsCardNotificationInfoProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardNotificationInfo({
  contractData,
}: MyHiringsCardNotificationInfoProps) {
  return (
    <div className={styles.MyHiringsCardDeliveryInfo}>
      <DeliveryContactEditableInput
        deliveryContact={contractData.deliveryContact}
        className={styles.EditableInputField}
      />
      <DeliveryCellphoneEditableInput className={styles.EditableInputField} />
    </div>
  );
}

export { MyHiringsCardNotificationInfo };
