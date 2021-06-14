import { useEffect, useState } from "react";
import { getContract } from "react-app/src/state/ducks/contracts/actions";
import { useRouter } from "next/router";
import { CLIENT_HIRINGS } from "constants/paths";
import { useDispatch, useSelector } from "react-redux";
import ClientContractType from "desktop-app/types/clientContract";

type StatusType = "loading" | "failed" | "completed";

type StateType = {
  contract: ClientContractType;
  status: StatusType;
};

const contractSelector = ({ contracts: { getContractReducer } }) => {
  let status: StatusType = "loading";
  if (getContractReducer.failed) status = "failed";
  if (getContractReducer.completed) status = "completed";

  const state: StateType = {
    contract: getContractReducer.data,
    status,
  };

  return state;
};

function useGetContract(contractReference: string, redirectOnFailure = false) {
  const { push } = useRouter();
  const state = useSelector(contractSelector);
  const dispatch = useDispatch();
  const [didFetch, setDidFetch] = useState(false);

  const isSameContract = state?.contract?.reference === contractReference;

  useEffect(() => {
    if (!contractReference || isSameContract) {
      return;
    }
    dispatch(getContract(contractReference));
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

export default useGetContract;
