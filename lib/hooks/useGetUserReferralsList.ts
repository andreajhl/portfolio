import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import { getUserReferralsList } from "react-app/src/state/ducks/referrals/actions";
import getObjectWithFallbackValues from "lib/utils/getObjectWithFallbackValues";
import ReferralType from "react-app/src/types/referralType";

const defaultParams = {
  offset: 0,
  limit: 5,
};

type StatusType = "loading" | "failed" | "completed";

type StateType = {
  referrals: ReferralType[];
  status: StatusType;
  totalResults: number;
};

const userReferralsListSelector = ({
  referrals: { getUserReferralsListReducer },
}: RootState) => {
  let status: StatusType = "loading";
  if (getUserReferralsListReducer.failed) status = "failed";
  if (getUserReferralsListReducer.completed) status = "completed";

  const state: StateType = {
    referrals: getUserReferralsListReducer?.data?.results || [],
    totalResults: getUserReferralsListReducer?.data?.totalResults,
    status,
  };

  return state;
};

function useGetUserReferralsList({
  offset = defaultParams.offset,
  limit = defaultParams.limit,
} = defaultParams) {
  const state = useSelector(userReferralsListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const listParams = getObjectWithFallbackValues(
      {
        offset,
        limit,
      },
      defaultParams
    );
    dispatch(getUserReferralsList(listParams));
  }, [dispatch, limit, offset]);

  return state;
}

export default useGetUserReferralsList;
