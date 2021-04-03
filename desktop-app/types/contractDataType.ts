import occasions from "constants/occasions";

export type ContractDeliveryType = {
  contractType: 1 | 2 | 3;
  deliveryTo: string;
  deliveryFrom?: string;
  deliveryType: 1;
};

export type ContractDetailsType = {
  occasion: keyof typeof occasions;
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
