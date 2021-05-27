import { celebrityType } from "./celebrityType";
import { OccasionType } from "./contractDataType";
import { ContractVideoType } from "./contractVideoType";

type UserData = {
  id: number;
  fullName?: string;
  profilePicture?: string;
};

type ContractType = {
  id: number;
  contractType: number;
  deliveryContact: string;
  deliveryType: number;
  isPublic: boolean;
  occasion: OccasionType;
  celebrityId: number;
  reference: string;
  status: number;
  deliveryTo: string;
  deliveryFrom: string;
  instructions: string;
  stars: number;
  review: string;
  deliveryContactCellphone: string;
  creationDate: string;
  paymentDate: string;
  recordingDate: string;
  celebrityData: celebrityType;
  userData: UserData;
} & ContractVideoType;

export default ContractType;
