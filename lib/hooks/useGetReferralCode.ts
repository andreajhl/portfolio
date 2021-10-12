import { useEffect } from "react";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";
import { getReferralCode } from "react-app/src/state/ducks/referrals/actions";
import { useAuth } from "lib/famosos-auth";

function getStatus(getCodeReducer: {
  error_data: any;
  failed: boolean;
  data: any;
  loading: boolean;
  completed: boolean;
}) {
  if (getCodeReducer.loading) return "loading";
  if (getCodeReducer.failed) return "failed";
  if (getCodeReducer.completed) return "completed";
  return "idle";
}

type StatusType = "idle" | "loading" | "failed" | "completed";

type StateType = {
  code: string;
  status: StatusType;
};

function getCodeSelector({ referrals: { getCodeReducer } }: RootState) {
  let status: StatusType = getStatus(getCodeReducer);

  const state: StateType = {
    code: getCodeReducer?.data,
    status,
  };

  return state;
}

function useGetReferralCode(): StateType {
  const { code, status } = useSelector(getCodeSelector);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isLoadingUser = !user;
  const userCode = user?.myReferralCode || code;
  const shouldFetch = status === "idle" && !userCode;

  useEffect(() => {
    if (isLoadingUser) return;
    if (!shouldFetch) return;
    dispatch(getReferralCode());
  }, [dispatch, shouldFetch, isLoadingUser]);

  return { status: userCode ? "completed" : status, code: userCode };
}

export default useGetReferralCode;
