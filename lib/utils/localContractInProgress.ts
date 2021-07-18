import { ContractDeliveryType } from "desktop-app/types/contractDataType";
import getWindow from "react-app/src/utils/getWindow";

const CONTRACT_IN_PROGRESS_PREFIX_KEY = "fs__lcip_";

const getLocalContractInProgressKey = (celebrityId: number): string =>
  CONTRACT_IN_PROGRESS_PREFIX_KEY + celebrityId;

export function setLocalContractInProgress(
  celebrityId: number,
  contractInProgressData: ContractDeliveryType
) {
  const stringifiedData = JSON.stringify(contractInProgressData);
  getWindow().localStorage.setItem(
    getLocalContractInProgressKey(celebrityId),
    stringifiedData
  );
}

export function getLocalContractInProgress(celebrityId: number) {
  const stringifiedData = getWindow().localStorage.getItem(
    getLocalContractInProgressKey(celebrityId)
  );

  if (!stringifiedData || stringifiedData === "undefined") return null;

  return JSON.parse(stringifiedData);
}

export function deleteLocalContractInProgress(celebrityId: number) {
  getWindow().localStorage.removeItem(
    getLocalContractInProgressKey(celebrityId)
  );
}
