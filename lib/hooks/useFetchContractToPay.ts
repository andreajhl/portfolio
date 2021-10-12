import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ROOT_PATH } from "constants/paths";
import { useDispatch } from "react-redux";
import { getContractToPayV2 } from "react-app/src/state/ducks/payments/actions";
import useGetContractToPayState from "./useGetContractToPayState";

function useFetchContractToPay(
  contractReference: string,
  redirectOnFailure = false
) {
  const { push } = useRouter();
  const state = useGetContractToPayState();
  const dispatch = useDispatch();
  const [didFetch, setDidFetch] = useState(false);

  const isSameContract = state?.contractToPay?.reference === contractReference;

  useEffect(() => {
    if (!contractReference || isSameContract) {
      return;
    }
    dispatch(getContractToPayV2(contractReference));
    setDidFetch(true);
  }, [isSameContract, contractReference, dispatch]);

  useEffect(() => {
    if (!redirectOnFailure) return;
    if (!didFetch) return;
    if (state.status !== "failed") return;
    push(ROOT_PATH);
  }, [redirectOnFailure, state.status, push, didFetch]);

  return state;
}

export default useFetchContractToPay;
