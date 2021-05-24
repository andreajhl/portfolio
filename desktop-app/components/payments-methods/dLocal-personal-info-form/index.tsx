import WarningMessage from "desktop-app/components/common/warning-message";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import classes from "classnames";

const initialValuesForm = {
  buyer_name: "",
  email_address: "",
  identification_document: "",
};

type DLocalPersonalInfoFormProps = {
  initialValues?: typeof initialValuesForm;
  onChangeValues: (data: {
    buyer_name: string;
    email_address: string;
    identification_document: string;
  }) => void;
  errorMessage: string;
};

const validations: ValidationsType<typeof initialValuesForm> = {
  buyer_name(value) {
    if (value.length === 0) return "Debes ingresar tu nombre";
  },
  email_address(value) {
    if (value.length === 0) return "Debes introducir tu correo electrónico";
  },
  identification_document(value) {
    if (value.length === 0)
      return "Debes introducir tu documento de identificación";
  },
};

function DLocalPersonalInfoForm({
  initialValues: initialValuesFromProps,
  onChangeValues,
  errorMessage,
}: DLocalPersonalInfoFormProps) {
  const { values, errors, onChangeField } = useForm<typeof initialValuesForm>({
    initialValues: Object.assign(initialValuesForm, initialValuesFromProps),
    validations,
  });
  useEffect(() => {
    onChangeValues({ ...values });
  }, [values]);
  return (
    <div>
      <form>
        <input
          value={values.buyer_name}
          className={styles.InputModifier}
          onChange={onChangeField}
          name="buyer_name"
          placeholder="Nombre"
        ></input>
        <WarningMessage
          message={errors?.buyer_name || null}
          className={classes(
            styles.FormError,
            errors?.buyer_name && styles.FormErrorIsVisible
          )}
        />
        <input
          value={values.email_address}
          className={styles.InputModifier}
          onChange={onChangeField}
          placeholder="E-mail"
          name="email_address"
        ></input>
        <WarningMessage
          message={errors?.email_address || null}
          className={classes(
            styles.FormError,
            errors?.email_address && styles.FormErrorIsVisible
          )}
        />
        <input
          value={values.identification_document}
          className={styles.InputModifier}
          onChange={onChangeField}
          placeholder="CURP"
          name="identification_document"
        ></input>
        <WarningMessage
          message={errors?.identification_document || null}
          className={classes(
            styles.FormError,
            errors?.identification_document && styles.FormErrorIsVisible
          )}
        />
      </form>
      <WarningMessage
        message={errorMessage}
        className={classes(
          styles.FormError,
          errorMessage && styles.FormErrorIsVisible
        )}
      />
    </div>
  );
}

export { DLocalPersonalInfoForm };
