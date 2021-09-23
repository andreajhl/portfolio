import { useEffect } from "react";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";
import { getReferralCode } from "react-app/src/state/ducks/referrals/actions";

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

function useGetReferralCode() {
  const state = useSelector(getCodeSelector);
  const dispatch = useDispatch();
  const shouldFetch = !state.code || state.status === "idle";

  useEffect(() => {
    if (!shouldFetch) return;
    dispatch(getReferralCode());
  }, [dispatch, shouldFetch]);

  return state;
}

export default useGetReferralCode;
