import { COUPON_CODE_KEY, COUPON_QUERY_PARAM } from "constants/keys";

export function getSessionCouponCode() {
  return sessionStorage.getItem(COUPON_CODE_KEY);
}

export function setSessionCouponCode(couponCode: string) {
  return sessionStorage.setItem(COUPON_CODE_KEY, couponCode);
}

export function removeSessionCouponCode() {
  return sessionStorage.removeItem(COUPON_CODE_KEY);
}

export function saveCouponParam(queryParams: { [key: string]: any }) {
  const couponCode = queryParams?.[COUPON_QUERY_PARAM]?.toString?.();
  if (typeof couponCode !== "string") return;
  setSessionCouponCode(couponCode);
}
