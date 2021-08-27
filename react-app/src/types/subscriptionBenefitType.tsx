export type BenefitTypeType = "RAFFLE" | "VIDEO_CALL" | "DISCOUNT";

export type SubscriptionBenefitType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  media_url: string;
  publication_date: Date;
  expiration_date: Date;
  benefit_type: BenefitTypeType;
  description: string;
  instructions: string;
  celebrityId: number;
  isProcessing: boolean;
};
