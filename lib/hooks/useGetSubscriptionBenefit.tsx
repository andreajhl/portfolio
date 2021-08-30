import { useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubscriptionBenefitType } from "react-app/src/types/subscriptionBenefitType";
import { SUBSCRIPTION_BENEFITS } from "constants/paths";

type StatusType = "loading" | "failed" | "completed";

function subscriptionBenefitSelector({
  celebritySubscriptionBenefits: { listSubscriptionBenefitsReducer },
}: RootState) {
  let status: StatusType = "completed";

  const state = {
    benefits: listSubscriptionBenefitsReducer?.data?.results,
    status,
  };

  return state;
}

/* TODO: Implement GET endpoint */
function useGetSubscriptionBenefit(benefitId: number) {
  const { benefits, status } = useSelector(subscriptionBenefitSelector);
  const benefit: SubscriptionBenefitType = benefits?.find?.(
    ({ id }) => benefitId === id
  );
  const { push } = useRouter();

  useEffect(() => {
    if (!benefit) {
      push(SUBSCRIPTION_BENEFITS);
    }
  }, [benefit, push]);

  return { benefit, status };
}

export default useGetSubscriptionBenefit;
