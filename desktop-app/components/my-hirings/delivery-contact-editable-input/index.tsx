import useForm from "lib/hooks/useForm";
import classes from "classnames";
import { useState } from "react";
import { EditableInputField } from "../../common/form/editable-input-field";

type DeliveryContactEditableInputProps = {
  deliveryContact: string;
  className?: string;
};

function DeliveryContactEditableInput({
  className = "",
  deliveryContact,
}: DeliveryContactEditableInputProps) {
  const [isLoading, setIsLoading] = useState(false);
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
      label="Correo electrónico de notificación"
      id="deliveryContact"
      name="deliveryContact"
      placeholder="correo@dominio.com"
      onClickSave={(setIsEditing) => {
        submitForm().then(() => setIsEditing(false));
      }}
    />
  );
}

export { DeliveryContactEditableInput };
