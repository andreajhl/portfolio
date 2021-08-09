import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ROOT_PATH } from "constants/paths";
import { useDispatch, useSelector } from "react-redux";
import ClientContractType from "desktop-app/types/clientContract";
import { RootState } from "react-app/src/state/store";
import { getPublicContract } from "react-app/src/state/ducks/hiring/actions";

type StatusType = "loading" | "failed" | "completed";

type StateType = {
  contract: ClientContractType;
  status: StatusType;
};

const contractSelector = ({
                            hiring: { getPublicContractReducer }
                          }: RootState) => {
  let status: StatusType = "loading";
  if (getPublicContractReducer.failed) status = "failed";
  if (getPublicContractReducer.completed) status = "completed";

  const state: StateType = {
    contract: getPublicContractReducer.data,
    status
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
    dispatch(getPublicContract(contractReference));
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

export default useGetContract;
