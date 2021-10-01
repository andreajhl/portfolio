import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import { discountCouponsGateways } from "react-app/src/state/ducks/payments/actions";
import { defineMessages, IntlFormatters, useIntl } from "lib/custom-intl";
import useCouponDataState from "lib/hooks/useCouponDataState";
import errorMessages from "lib/validations/errorMessages";

const messages = defineMessages({
  "Este cupon ha alcanzado el número de usos permitidos": {
    defaultMessage:
      "Este cupón ha alcanzado el número máximo de usos permitidos",
  },
  fallbackErrorMessage: {
    defaultMessage: "Ha ocurrido un error agregando tu cupón",
  },
  "Ya has utilizado este cupon": {
    defaultMessage: "Ya has utilizado este cupón",
  },
});

export const initialValues = {
  coupon: "",
};

export function getValidations(
  formatMessage: IntlFormatters["formatMessage"]
): ValidationsType<{
  coupon: string;
}> {
  return {
    coupon(value) {
      if (value.length === 0) {
        return formatMessage(errorMessages.invalidCoupon);
      }
    },
  };
}

export function useApplyDiscountCouponForm({
  contractReference,
}: {
  contractReference: string;
}) {
  const dispatch = useDispatch();
  const { errorData, status } = useCouponDataState();
  const { formatMessage } = useIntl();
  const formState = useForm({
    initialValues: initialValues,
    validations: getValidations(formatMessage),
    onSubmit(data) {
      dispatch(discountCouponsGateways(contractReference, data.coupon));
    },
  });

  useEffect(() => {
    if (errorData === null) return;
    formState.setFieldError(
      "coupon",
      formatMessage(messages[errorData] || messages.fallbackErrorMessage)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorData]);

  return { ...formState, status };
}
