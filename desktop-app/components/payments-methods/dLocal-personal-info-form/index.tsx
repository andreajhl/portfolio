import WarningMessage from "desktop-app/components/common/warning-message";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import { allowedFormatDocuments } from "constants/userDocumentFormatAllowedByCurrency";
import {
  AVAILABLE_DOCUMENTS_NAME_FOR_COUNTRIES,
  DOCUMENT_NAME_FOR_COUNTRIES,
} from "react-app/src/constants/messages";
import { RootState } from "react-app/src/state/store";
import { connect, ConnectedProps } from "react-redux";
import { defineMessages, IntlFormatters, useIntl } from "react-intl";
import errorMessages from "lib/validations/errorMessages";
import { getEmailValidator } from "lib/validations/common";
import { AVAILABLE_CURRENCIES } from "react-app/src/constants/availableCurrencies";
import { getTextOfFormatAllowedForUserDocument } from "react-app/src/state/utils/getTextOfFormatAllowedForUserDocument";

const initialValuesForm = {
  buyer_name: "",
  email_address: "",
  identification_document: "",
};

type InitialValuesType = typeof initialValuesForm;

function getValidations(
  formatMessage: IntlFormatters["formatMessage"],
  currency: string
): ValidationsType<InitialValuesType> {
  return {
    buyer_name(value) {
      if (value.length === 0) {
        return formatMessage(errorMessages.emptyNameError);
      }
    },
    email_address: getEmailValidator(formatMessage),
    identification_document(value) {
      const checkDocument = allowedFormatDocuments[currency];
      if (!checkDocument(value)) {
        return formatMessage(errorMessages.invalidIdentificationDocument);
      }
    },
  };
}

const mapStateToProps = ({ payments }: RootState) => ({
  currencyExchangeData: payments.currencyExchangeReducer.data,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type DLocalPersonalInfoFormProps = {
  initialValues?: typeof initialValuesForm;
  onChangeValues: (data: {
    buyer_name: string;
    email_address: string;
    identification_document: string;
  }) => void;
  errorMessage: string;
  currency: string;
} & PropsFromRedux;

const messages = defineMessages({
  placeholderBuyerName: {
    defaultMessage: "Nombre",
  },
  placeholderEmailAddress: {
    defaultMessage: "E-mail",
  },
});

function DLocalPersonalInfoForm({
  initialValues: initialValuesFromProps,
  onChangeValues,
  errorMessage,
  currency,
  currencyExchangeData,
}: DLocalPersonalInfoFormProps) {
  const { formatMessage } = useIntl();
  const { values, errors, onChangeField } = useForm<InitialValuesType>({
    initialValues: Object.assign(initialValuesForm, initialValuesFromProps),
    validations: getValidations(formatMessage, currency),
  });

  useEffect(() => {
    onChangeValues({ ...values });
  }, [values]);

  const document_name_available = AVAILABLE_CURRENCIES.find(
    (data) => data.name === currencyExchangeData.to
  );

  return (
    <div>
      <form>
        <input
          value={values.buyer_name}
          className={styles.InputModifier}
          onChange={onChangeField}
          name="buyer_name"
          placeholder={formatMessage(messages.placeholderBuyerName)}
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
          placeholder={formatMessage(messages.placeholderEmailAddress)}
          name="email_address"
        />
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
          placeholder={
            AVAILABLE_DOCUMENTS_NAME_FOR_COUNTRIES.includes(
              document_name_available?.name
            )
              ? formatMessage(
                  DOCUMENT_NAME_FOR_COUNTRIES[document_name_available?.name]
                )
              : document_name_available?.document_name
          }
          name="identification_document"
        />
        <WarningMessage
          message={errors?.identification_document || null}
          className={classes(
            styles.FormError,
            errors?.identification_document && styles.FormErrorIsVisible
          )}
        />
        {errors.identification_document ? (
          <WarningMessage
            className={classes(
              styles.FormError,
              errors?.identification_document && styles.FormErrorIsVisible
            )}
            message={getTextOfFormatAllowedForUserDocument(
              document_name_available.document_name
            )}
          />
        ) : null}
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

const _DLocalPersonalInfoForm = connector(DLocalPersonalInfoForm);

export default DLocalPersonalInfoForm;

export { _DLocalPersonalInfoForm as DLocalPersonalInfoForm };
