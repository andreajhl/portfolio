import getObjectWithFallbackValues from "lib/utils/getObjectWithFallbackValues";
import { useEffect } from "react";
import { listSubscriptionBenefits } from "react-app/src/state/ducks/celebrity-subscription-benefits/actions";
import { RootState } from "react-app/src/state/store";
import { SubscriptionBenefitType } from "react-app/src/types/subscriptionBenefitType";
import { useDispatch, useSelector } from "react-redux";

function getStatus(listSubscriptionBenefitsReducer: {
  error_data: any;
  failed: boolean;
  data: any;
  loading: boolean;
  completed: boolean;
}) {
  if (listSubscriptionBenefitsReducer.loading) return "loading";
  if (listSubscriptionBenefitsReducer.failed) return "failed";
  if (listSubscriptionBenefitsReducer.completed) return "completed";
  return "loading";
}

type ParamsType = {
  celebrityId?: string;
  offset?: number;
  limit?: number;
};

const defaultParams = {
  celebrityId: "",
  offset: 0,
  limit: 10,
};

type StatusType = "loading" | "failed" | "completed";

type StateType = {
  benefits: SubscriptionBenefitType[];
  status: StatusType;
  totalResults: number;
};

function listSubscriptionBenefitsSelector({
  celebritySubscriptionBenefits: { listSubscriptionBenefitsReducer },
}: RootState) {
  let status: StatusType = getStatus(listSubscriptionBenefitsReducer);

  const state: StateType = {
    benefits: listSubscriptionBenefitsReducer?.data?.results || [],
    totalResults: listSubscriptionBenefitsReducer?.data?.totalResults,
    status,
  };

  return state;
}

function useListSubscriptionBenefits({
  celebrityId = defaultParams.celebrityId,
  offset = defaultParams.offset,
  limit = defaultParams.limit,
  shouldFetch = true,
}: { shouldFetch?: boolean } & ParamsType): StateType {
  const state = useSelector(listSubscriptionBenefitsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldFetch) return;
    const listParams = getObjectWithFallbackValues(
      {
        celebrityId,
        offset,
        limit,
      },
      defaultParams
    );
    dispatch(listSubscriptionBenefits(listParams));
  }, [celebrityId, dispatch, limit, offset, shouldFetch]);

  return state;
}

export default useListSubscriptionBenefits;
