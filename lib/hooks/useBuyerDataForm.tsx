import useForm, { ValidationsType } from "lib/hooks/useForm";
import { useAuth } from "lib/famosos-auth";
import getObjectWithFallbackValues from "lib/utils/getObjectWithFallbackValues";
import { IntlFormatters, useIntl } from "react-intl";
import useUserCurrentCurrency from "lib/hooks/useUserCurrentCurrency";
import errorMessages from "lib/validations/errorMessages";
import { getEmailValidator } from "lib/validations/common";
import { allowedFormatDocuments } from "constants/userDocumentFormatAllowedByCurrency";
import { setBuyerData } from "react-app/src/state/ducks/payments/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useBuyerDataState from "desktop-app/components/payments-methods/dLocal-payment-method-form/useBuyerDataState";
import { BuyerDataType } from "desktop-app/types/payment-methods";
import { userDetails } from "desktop-app/types/userDetails";

export const initialValues: BuyerDataType = {
  buyerFullName: "",
  buyerEmail: "",
  buyerDocument: "",
};

type InitialValuesType = BuyerDataType;

function getInitialValues(
  buyerDataFromRedux: InitialValuesType,
  user: userDetails
): InitialValuesType {
  const buyerUserData = getObjectWithFallbackValues(
    {
      buyerFullName: user?.fullName,
      buyerEmail: user?.email,
      buyerDocument: "",
    },
    initialValues
  );

  return getObjectWithFallbackValues(buyerDataFromRedux, buyerUserData);
}

function getValidations(
  formatMessage: IntlFormatters["formatMessage"],
  userCurrency: string
): ValidationsType<InitialValuesType> {
  return {
    buyerFullName(value) {
      if (value.length === 0) {
        return formatMessage(errorMessages.emptyNameError);
      }
    },
    buyerEmail: getEmailValidator(formatMessage),
    buyerDocument(value) {
      const checkDocument = allowedFormatDocuments[userCurrency];
      if (!checkDocument(value)) {
        return formatMessage(errorMessages.invalidIdentificationDocument);
      }
    },
  };
}

function useBuyerDataForm() {
  const { user } = useAuth();
  const buyerDataFromRedux = useBuyerDataState();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const userCurrency = useUserCurrentCurrency();
  const formState = useForm({
    initialValues: getInitialValues(buyerDataFromRedux, user),
    validations: getValidations(formatMessage, userCurrency),
  });

  const {
    buyerFullName = "",
    buyerEmail = "",
    buyerDocument = "",
  } = formState.values;

  useEffect(() => {
    dispatch(
      setBuyerData({
        buyerFullName,
        buyerEmail,
        buyerDocument,
      })
    );
  }, [dispatch, buyerFullName, buyerEmail, buyerDocument]);

  return formState;
}

export default useBuyerDataForm;
