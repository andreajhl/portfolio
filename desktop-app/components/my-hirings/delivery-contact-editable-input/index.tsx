import useForm from "lib/hooks/useForm";
import classes from "classnames";
import { useState } from "react";
import { EditableInputField } from "../../common/form/editable-input-field";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

type DeliveryContactEditableInputProps = {
  deliveryContact: string;
  className?: string;
};

const messages = defineMessages({
  placeholder: {
    defaultMessage: "correo@dominio.com",
  },
  label: {
    defaultMessage: "Correo electrónico de notificación",
  },
});
function DeliveryContactEditableInput({
  className = "",
  deliveryContact,
}: DeliveryContactEditableInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { formatMessage } = useIntl();
  const { values, submitForm } = useForm<{ deliveryContact: string }>({
    initialValues: { deliveryContact },
    async onSubmit() {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    },
  });

  return (
    <EditableInputField
      className={classes(className)}
      value={values.deliveryContact}
      label={formatMessage(messages.label)}
      id="deliveryContact"
      name="deliveryContact"
      placeholder={formatMessage(messages.placeholder)}
      onClickSave={(setIsEditing) => {
        submitForm().then(() => setIsEditing(false));
      }}
    />
  );
}

export { DeliveryContactEditableInput };
