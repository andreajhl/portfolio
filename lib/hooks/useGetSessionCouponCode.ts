import useIsInBrowser from "react-app/src/utils/useIsInBrowser";
import { getSessionCouponCode } from "lib/utils/session-coupon";

export function useGetSessionCouponCode() {
  const isInBrowser = useIsInBrowser();
  return isInBrowser && getSessionCouponCode();
}
