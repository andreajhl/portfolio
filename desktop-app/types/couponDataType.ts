type CouponDataType = {
  id: number;
  couponType: string;
  couponCode: string;
  isPercentageDiscount: boolean;
  discountAmount: number;
  discountPercentage: number;
  finalAmount: number;
};

export default CouponDataType;
