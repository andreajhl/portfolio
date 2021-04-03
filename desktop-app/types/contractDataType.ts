import occasions from "constants/occasions";

export type ContractTypeType = 1 | 2 | 3;

export type ContractDeliveryType = {
  contractType: ContractTypeType;
  deliveryTo: string;
  deliveryFrom?: string;
  deliveryType: 1;
};

export type OccasionType = keyof typeof occasions;

export type ContractDetailsType = {
  occasion: OccasionType;
  instructions: string;
};

export type ContractNotificationsType = {
  deliveryContact: string;
  deliveryContactCellphone?: string;
  isPublic: boolean;
};

type ContractDataType = { celebrityId: number } & ContractDeliveryType &
  ContractDetailsType &
  ContractNotificationsType;

export default ContractDataType;
