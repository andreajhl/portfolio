import ContractToPayType from "desktop-app/types/contractToPayType";
import { RootState } from "react-app/src/state/store";
import { useSelector } from "react-redux";

type StatusType = "loading" | "failed" | "completed";

type StateType = {
  contractToPay: ContractToPayType;
  status: StatusType;
};

function contractToPaySelector({
  payments: { getContractToPayReducer },
}: RootState) {
  let status: StatusType = "loading";
  if (getContractToPayReducer.failed) status = "failed";
  if (getContractToPayReducer.completed) status = "completed";

  const state: StateType = {
    contractToPay: getContractToPayReducer.data,
    status,
  };

  return state;
}

function useGetContractToPayState() {
  return useSelector(contractToPaySelector);
}

export default useGetContractToPayState;
