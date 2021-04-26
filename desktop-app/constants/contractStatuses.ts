export const CREATED = 5;
export const PENDING_TO_PAY = 6;
export const PAYED_BY_CLIENT = 10;
export const REJECTED = 20;
export const EXPIRED = 25;
export const RECORDED = 30;
export const COMPLETED = 40;

const canEditIsPublicContractStatuses = [
  CREATED,
  PAYED_BY_CLIENT,
  RECORDED,
  COMPLETED,
];

export const canEditIsPublic = (contractStatus: number) =>
  canEditIsPublicContractStatuses.includes(contractStatus);

const canEditContractStatuses = [CREATED, PAYED_BY_CLIENT];

export const canEditContract = (contractStatus: number) =>
  canEditContractStatuses.includes(contractStatus);
