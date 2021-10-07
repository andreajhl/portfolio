import { OccasionType } from "./contractDataType";

type ContractToPayType = {
  status: number;
  reference: string;
  celebrity_id: number;
  celebrity_avatar: string;
  celebrity_full_name: string;
  occasion: OccasionType;
  delivery_to: string;
  delivery_from?: string;
  instructions: string;
  price: number;
  original_price: number;
  discount_percentage: number;
};

export default ContractToPayType;
