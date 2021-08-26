export type BenefitTypeType = "RAFFLE" | "VIDEO_CALL" | "DISCOUNT";

export type BenefitType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  title: string;
  mediaUrl: string;
  publicationDate: Date;
  expirationDate: Date;
  benefitType: BenefitTypeType;
  description: string;
  instructions: string;
  celebrityId: number;
  isProcessing: boolean;
};
