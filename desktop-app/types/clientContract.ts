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
  occasion: string;
  userId: number;
  celebrityId: number;
  reference: string;
  status: number;
  deliveryTo: string;
  media: string;
  deliveryFrom: string;
  instructions: string;
  stars: number;
  review: string;
  deliveryContactCellphone: string;
  // poster del video
  celebrityData: CelebrityData;
  userData: UserData;
};

export default ClientContractType;
