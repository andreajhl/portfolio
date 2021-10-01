import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import {
  clearCouponData,
  discountCouponsGateways,
} from "react-app/src/state/ducks/payments/actions";
import { defineMessages, IntlFormatters, useIntl } from "lib/custom-intl";
import useCouponDataState from "lib/hooks/useCouponDataState";
import errorMessages from "lib/validations/errorMessages";
import useDiscountStarsSelected from "./useDiscountStarsSelected";

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
  cannotApplyCouponError: {
    defaultMessage:
      "No puedes usar este cupón debido a que sobrepasa el precio del pago",
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
  const starsSelected = useDiscountStarsSelected()[0];
  const dispatch = useDispatch();
  const { errorData, status, couponData } = useCouponDataState();
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

  const hasFetchedCoupon = typeof couponData?.finalAmount === "number";
  const canApplyCouponDiscount = couponData.finalAmount - starsSelected >= 0;

  useEffect(() => {
    if (!hasFetchedCoupon || canApplyCouponDiscount) return;
    formState.setFieldError(
      "coupon",
      formatMessage(messages.cannotApplyCouponError)
    );
    dispatch(clearCouponData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canApplyCouponDiscount, hasFetchedCoupon]);

  return { ...formState, status };
}
