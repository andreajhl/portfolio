import useCouponDataState from "./useCouponDataState";

function useHasAppliedCoupon() {
  return useCouponDataState().status === "completed";
}

export default useHasAppliedCoupon;
