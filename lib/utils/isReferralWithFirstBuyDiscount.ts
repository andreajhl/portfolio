function isReferralWithFirstBuyDiscount(user: {
  referrerCode: string;
  isBuyReferralCompleted: boolean;
}) {
  return user?.referrerCode && !user?.isBuyReferralCompleted;
}

export default isReferralWithFirstBuyDiscount;
