import useCouponDataState from "lib/hooks/useCouponDataState";
import useDiscountStarsSelected from "lib/hooks/useDiscountStarsSelected";
import useGetContractToPayState from "lib/hooks/useGetContractToPayState";
import useHasAppliedCoupon from "lib/hooks/useHasAppliedCoupon";

function useGetContractTotalPrice() {
  const starsSelected = useDiscountStarsSelected()[0];
  const starsDiscount = starsSelected >= 0 ? starsSelected : 0;
  const { couponData } = useCouponDataState();
  const { contractToPay } = useGetContractToPayState();
  const hasAppliedCoupon = useHasAppliedCoupon();

  const priceWithCoupon = hasAppliedCoupon
    ? couponData.finalAmount
    : contractToPay.price;

  const priceWithStarsDiscount = priceWithCoupon - starsDiscount;

  return priceWithStarsDiscount >= 0 ? priceWithStarsDiscount : 0;
}

export default useGetContractTotalPrice;
