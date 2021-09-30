import { STAR_PRICE_IN_DOLLARS } from "constants/referrals";
import { PriceLayout } from "desktop-app/components/common/helpers/price-layout";
import useCouponDataState from "lib/hooks/useCouponDataState";
import useDiscountStarsSelected from "lib/hooks/useDiscountStarsSelected";
import useGetContractToPayState from "lib/hooks/useGetContractToPayState";
import Maybe from "../common/helpers/maybe";
import { ReferralsStarIcon } from "../common/icons";
import useGetContractTotalPrice from "lib/hooks/useGetContractTotalPrice";

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
  const totalPrice = useGetContractTotalPrice();

  return <PriceLayout decimalScale={1} price={totalPrice} />;
}

function DiscountStarsSelectedPrice() {
  const starsSelected = useDiscountStarsSelected()[0] ?? 0;
  const starsSelectedText = `${starsSelected} |`;

  return (
    <>
      <ReferralsStarIcon /> {starsSelectedText}{" "}
      <PriceLayout
        decimalScale={2}
        price={STAR_PRICE_IN_DOLLARS * starsSelected}
      />
    </>
  );
}

export {
  TotalPrice,
  DiscountAmount,
  BasePrice,
  OriginalPrice,
  DiscountStarsSelectedPrice,
};
