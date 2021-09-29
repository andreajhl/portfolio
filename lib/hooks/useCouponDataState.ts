import { useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import CouponDataType from "desktop-app/types/couponDataType";

type StatusType = "idle" | "loading" | "failed" | "completed";

type StateType = {
  couponData: CouponDataType;
  status: StatusType;
  errorData?: any;
};

function couponDataSelector({
  payments: { fetchDiscountCouponReducer },
}: RootState) {
  let status: StatusType = "idle";
  const errorData = fetchDiscountCouponReducer.error_data;
  if (errorData !== null) status = "failed";
  if (fetchDiscountCouponReducer.loading) status = "loading";
  if (fetchDiscountCouponReducer.completed) status = "completed";

  const state: StateType = {
    couponData: fetchDiscountCouponReducer.data,
    status,
    errorData,
  };

  return state;
}

function useCouponDataState() {
  const state = useSelector(couponDataSelector);
  return state;
}

export default useCouponDataState;
