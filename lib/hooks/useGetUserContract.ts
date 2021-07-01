import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getHiringPreviewPath } from "constants/paths";
import { useDispatch, useSelector } from "react-redux";
import ClientContractType from "desktop-app/types/clientContract";
import { RootState } from "react-app/src/state/store";
import { getUserContract } from "react-app/src/state/ducks/session/actions";

const UNAUTHORIZED_ERROR = "invalid reference by user";

type StatusType = "loading" | "failed" | "completed" | "unauthorized";

type StateType = {
  contract: ClientContractType;
  status: StatusType;
};

const contractSelector = ({
  session: { getUserContractReducer },
}: RootState) => {
  let status: StatusType = "loading";
  if (getUserContractReducer.failed) status = "failed";
  if (getUserContractReducer.completed) status = "completed";
  if (getUserContractReducer?.error_data?.message === UNAUTHORIZED_ERROR) {
    status = "unauthorized";
  }

  const state: StateType = {
    contract: getUserContractReducer.data,
    status,
  };

  return state;
};

function useGetUserContract(
  contractReference: string,
  redirectOnFailure = true
) {
  const { push } = useRouter();
  const state = useSelector(contractSelector);
  const dispatch = useDispatch();
  const [didFetch, setDidFetch] = useState(false);

  const isSameContract = state?.contract?.reference === contractReference;

  useEffect(() => {
    if (!contractReference || isSameContract) {
      return;
    }
    dispatch(getUserContract(contractReference));
    setDidFetch(true);
  }, [isSameContract, contractReference, dispatch]);

  useEffect(() => {
    if (!redirectOnFailure) return;
    if (!didFetch) return;
    const isUnauthorized = state.status === "unauthorized";
    if (state.status === "failed" || isUnauthorized) {
      push(getHiringPreviewPath(contractReference, { isUnauthorized }));
    }
  }, [redirectOnFailure, state.status, push, didFetch, contractReference]);

  return state;
}

export default useGetUserContract;
