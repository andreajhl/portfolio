import { PriceLayout } from "desktop-app/components/common/helpers/price-layout";
import useCouponDataState from "lib/hooks/useCouponDataState";
import useGetContractToPayState from "lib/hooks/useGetContractToPayState";
import useHasAppliedCoupon from "lib/hooks/useHasAppliedCoupon";
import Maybe from "../common/helpers/maybe";

function getPercentageFromFloat(floatPercentage: number) {
  return (floatPercentage * 100).toFixed(2);
}

function DiscountAmount() {
  const { couponData } = useCouponDataState();
  const discountPercentage = `${getPercentageFromFloat(
    couponData.discountPercentage
  )}% |`;

  return (
    <>
      <Maybe it={couponData.isPercentageDiscount}>{discountPercentage}</Maybe>{" "}
      <PriceLayout decimalScale={1} price={couponData.discountAmount} />
    </>
  );
}

function BasePrice() {
  const { contractToPay } = useGetContractToPayState();

  return <PriceLayout decimalScale={0} price={contractToPay.price} />;
}

function OriginalPrice() {
  const { contractToPay } = useGetContractToPayState();

  return <PriceLayout decimalScale={0} price={contractToPay.original_price} />;
}

function TotalPrice() {
  const { couponData } = useCouponDataState();
  const hasAppliedCoupon = useHasAppliedCoupon();

  if (hasAppliedCoupon) {
    return <PriceLayout decimalScale={1} price={couponData.finalAmount} />;
  }

  return <BasePrice />;
}

export { TotalPrice, DiscountAmount, BasePrice, OriginalPrice };
