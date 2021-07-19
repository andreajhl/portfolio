import { DeliveryCellphoneEditableInput } from "desktop-app/components/my-hirings/delivery-cellphone-editable-input";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import classes from "classnames";
import {
  canEditContract,
  COMPLETED,
} from "desktop-app/constants/contractStatuses";
import Maybe from "desktop-app/components/common/helpers/maybe";
import styles from "./styles.module.scss";
import { InputField } from "desktop-app/components/common/form/input-field";
import { DeliveryCellphoneInput } from "desktop-app/components/my-hirings/delivery-cellphone-input";
import { useEffect, useState } from "react";
import { useUpdateHiredContract } from "lib/hooks/useUpdateHiredContract";
import { CollapsibleErrorMessage } from "desktop-app/components/common/widgets/collapsible-error-message";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

function FieldInfo({ title, value }: { title: string; value: string }) {
  return (
    <div className={styles.InfoWrapper}>
      <h4 className={styles.InfoTitle}>{title}</h4>
      <span className={styles.InfoValue}>{value}</span>
    </div>
  );
}

type MyHiringsCardNotificationInfoProps = {
  contractData: MyHiringsContract;
  isEditing: boolean;
  values: { deliveryContact: string; deliveryContactCellphone: string };
  errors: { deliveryContact?: string; deliveryContactCellphone?: string };
  onChangeField?: ({
    target: { name, value },
  }: {
    target: {
      name: any;
      value: any;
    };
  }) => void;
  setFieldValue?: (name: string, value: any, shouldValidate?: boolean) => void;
};

const messages = defineMessages({
  fieldInfoTitleMail: {
    defaultMessage: "Correo electrónico de notificación",
  },
  fieldInfoTitleWhatsapp: {
    defaultMessage: "Whatsapp de notificación",
  },
});

function MyHiringsCardNotificationInfo({
  contractData,
  isEditing,
  values,
  errors,
  onChangeField = function () {},
  setFieldValue = function () {},
}: MyHiringsCardNotificationInfoProps) {
  const { update } = useUpdateHiredContract();
  const { formatMessage } = useIntl();
  const { deliveryContactCellphone, deliveryContact } = values;
  const [hasAddedCellphoneNumber, setHasAddedCellphoneNumber] = useState(false);
  const canEdit = canEditContract(contractData.status);

  function setDeliveryContactCellphoneValue(value: string) {
    setFieldValue("deliveryContactCellphone", value);
  }

  const addDeliveryContactCellphone = (
    deliveryContactCellphone: string
  ): void => {
    setDeliveryContactCellphoneValue(deliveryContactCellphone);
    update(contractData.reference, { deliveryContactCellphone });
  };

  useEffect(() => {
    setHasAddedCellphoneNumber(deliveryContactCellphone !== "");
  }, [deliveryContactCellphone]);

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
            <FieldInfo
              title={formatMessage(messages.fieldInfoTitleMail)}
              value={deliveryContact}
            />
            <Maybe it={Boolean(deliveryContactCellphone)}>
              <FieldInfo
                title={formatMessage(messages.fieldInfoTitleWhatsapp)}
                value={`+${deliveryContactCellphone}`}
              />
            </Maybe>
          </>
        }
      >
        <div className={styles.InputWrapper}>
          <label className={styles.InputLabel}>
            <FormattedMessage defaultMessage="Correo electrónico de notificación" />
          </label>
          <InputField
            name="deliveryContact"
            className={styles.InputField}
            onChange={onChangeField}
            value={deliveryContact}
            disabled={!isEditing}
          />
          <CollapsibleErrorMessage
            unmountOnExit
            errorMessage={errors?.deliveryContact}
            className={styles.ErrorMessage}
          />
        </div>
        <Maybe
          it={hasAddedCellphoneNumber || isEditing}
          orElse={
            <DeliveryCellphoneEditableInput
              className={styles.EditableInputField}
              onSave={addDeliveryContactCellphone}
            />
          }
        >
          <div className={styles.InputWrapper}>
            <label className={styles.InputLabel}>
              <FormattedMessage defaultMessage="Whatsapp de notificación (opcional)" />
            </label>
            <DeliveryCellphoneInput
              onChange={setDeliveryContactCellphoneValue}
              value={deliveryContactCellphone}
              disabled={!isEditing}
            />
          </div>
        </Maybe>
      </Maybe>
    </div>
  );
}

export { MyHiringsCardNotificationInfo };
