import { OccasionType } from "./contractDataType";

type UserData = {
  id: number;
};

type CelebrityData = {
  id: number;
  username: string;
  avatar: string;
  fullName: string;
};

type ClientContractType = {
  id: number;
  contractType: number;
  deliveryContact: string;
  deliveryType: number;
  isPublic: boolean;
  occasion: OccasionType;
  userId: number;
  celebrityId: number;
  reference: string;
  status: number;
  deliveryTo: string;
  media: string;
  mediaPosterUrl: string;
  deliveryFrom: string;
  instructions: string;
  stars: number;
  review: string;
  deliveryContactCellphone: string;
  celebrityData: CelebrityData;
  userData: UserData;
};

export default ClientContractType;
