export type SubscriptionPostUrlType = {
  id: number;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
};

type SubscriptionPostsReactions = {
  post_love: boolean;
  post_comment: string;
};

export type SubscriptionPostType = {
  id: number;
  celebrityId: number;
  description: string;
  location: string;
  isProcessing: boolean;
  processingDate: string;
  createdAt: string;
  items: SubscriptionPostUrlType[];
  reactions: SubscriptionPostsReactions;
  comments: number;
  loved: number;
};
