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
  const [benefit, setBenefit] = useState<SubscriptionBenefitType>();
  const { push } = useRouter();

  useEffect(() => {
    const benefit = benefits?.find?.(({ id }) => benefitId === id);
    if (benefit) {
      setBenefit(benefit);
    } else {
      push(SUBSCRIPTION_BENEFITS);
    }
  }, [benefitId, benefits, push]);

  return { benefit, status };
}

export default useGetSubscriptionBenefit;
