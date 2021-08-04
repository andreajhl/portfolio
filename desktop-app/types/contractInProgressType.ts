type ContractInProgressType = null | {
  celebrityId: number;
  contractId: number;
  contractType: number;
  deliveryTo: string;
  deliveryFrom: string;
  deliveryType: string;
  occasion: string;
  instructions: string;
  deliveryContact: string;
  deliveryContactCellphone: string;
  isPublic: boolean;
  status: number;
};

export default ContractInProgressType;
