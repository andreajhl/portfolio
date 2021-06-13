import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CLIENT_HIRINGS } from "constants/paths";
import { useDispatch, useSelector } from "react-redux";
import ClientContractType from "desktop-app/types/clientContract";
import { RootState } from "react-app/src/state/store";
import { getUserContract } from "react-app/src/state/ducks/session/actions";

type StatusType = "loading" | "failed" | "completed";

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
    if (state.status !== "failed") return;
    push(CLIENT_HIRINGS);
  }, [redirectOnFailure, state.status, push, didFetch]);

  return state;
}

export default useGetUserContract;
