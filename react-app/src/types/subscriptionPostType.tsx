export type SubscriptionPostUrlType = {
  index: number;
  type: "image" | "video";
  value: string;
};

export type SubscriptionPostType = {
  celebrityId: number;
  created: string;
  deleted: string | null;
  description: string;
  id: string;
  urls: SubscriptionPostUrlType[];
  location: string;
  success: boolean;
};
