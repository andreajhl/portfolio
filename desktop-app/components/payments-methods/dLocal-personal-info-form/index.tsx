import WarningMessage from "desktop-app/components/common/warning-message";
import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import {
  AVAILABLE_DOCUMENTS_NAME_FOR_COUNTRIES,
  DOCUMENT_NAME_FOR_COUNTRIES,
} from "react-app/src/constants/messages";
import { defineMessages, useIntl } from "react-intl";
import { AVAILABLE_CURRENCIES } from "react-app/src/constants/availableCurrencies";
import { getTextOfFormatAllowedForUserDocument } from "react-app/src/state/utils/getTextOfFormatAllowedForUserDocument";
import useBuyerDataForm from "../../../../lib/hooks/useBuyerDataForm";
import useUserCurrentCurrency from "lib/hooks/useUserCurrentCurrency";

type DLocalPersonalInfoFormProps = {
  errorMessage: string;
};

const messages = defineMessages({
  placeholderBuyerName: {
    defaultMessage: "Nombre",
  },
  placeholderEmailAddress: {
    defaultMessage: "E-mail",
  },
});

function DLocalPersonalInfoForm({ errorMessage }: DLocalPersonalInfoFormProps) {
  const { formatMessage } = useIntl();
  const userCurrency = useUserCurrentCurrency();
  const { values, errors, onChangeField } = useBuyerDataForm();

  const document_name_available = AVAILABLE_CURRENCIES.find(
    (data) => data.name === userCurrency
  );

  return (
    <div>
      <form>
        <input
          value={values.buyerFullName}
          className={styles.InputModifier}
          onChange={onChangeField}
          name="buyerFullName"
          placeholder={formatMessage(messages.placeholderBuyerName)}
        />
        <WarningMessage
          message={errors?.buyerFullName || null}
          className={classes(
            styles.FormError,
            errors?.buyerFullName && styles.FormErrorIsVisible
          )}
        />
        <input
          value={values.buyerEmail}
          className={styles.InputModifier}
          onChange={onChangeField}
          placeholder={formatMessage(messages.placeholderEmailAddress)}
          name="buyerEmail"
        />
        <WarningMessage
          message={errors?.buyerEmail || null}
          className={classes(
            styles.FormError,
            errors?.buyerEmail && styles.FormErrorIsVisible
          )}
        />
        <input
          value={values.buyerDocument}
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
          name="buyerDocument"
        />
        <WarningMessage
          message={errors?.buyerDocument || null}
          className={classes(
            styles.FormError,
            errors?.buyerDocument && styles.FormErrorIsVisible
          )}
        />
        {errors.buyerDocument ? (
          <WarningMessage
            className={classes(
              styles.FormError,
              errors?.buyerDocument && styles.FormErrorIsVisible
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

export { DLocalPersonalInfoForm };
