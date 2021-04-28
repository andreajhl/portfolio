type MyHiringsContract = {
  status: number;
  id: number;
  reference: string;
  contractType: number;
  deliveryContact: string;
  deliveryFrom: string;
  deliveryTo: string;
  deliveryType: number;
  instructions: string;
  isPublic: boolean;
  occasion: string;
  userId: number;
  celebrityId: number;
  paymentDate: string;
  stars: number;
  review: string;
  celebrityData: CelebrityData;
  // fecha de grabación
  // deliveryCellphone
};

type CelebrityData = {
  id: number;
  username: string;
  avatar: string;
  fullName: string;
};

export default MyHiringsContract;
