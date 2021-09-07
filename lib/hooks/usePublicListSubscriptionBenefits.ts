import getObjectWithFallbackValues from "lib/utils/getObjectWithFallbackValues";
import { useEffect, useRef } from "react";
import {
  publicListSubscriptionBenefits,
  setPublicListSubscriptionBenefitsOffset,
} from "react-app/src/state/ducks/celebrity-subscription-benefits/actions";
import { RootState } from "react-app/src/state/store";
import { SubscriptionBenefitType } from "react-app/src/types/subscriptionBenefitType";
import { useDispatch, useSelector } from "react-redux";

function getStatus(publicListSubscriptionBenefitsReducer: {
  error_data: any;
  failed: boolean;
  data: any;
  loading: boolean;
  completed: boolean;
}) {
  if (publicListSubscriptionBenefitsReducer.loading) return "loading";
  if (publicListSubscriptionBenefitsReducer.failed) return "failed";
  if (publicListSubscriptionBenefitsReducer.completed) return "completed";
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
  currentParams: ParamsType;
};

function publicListSubscriptionBenefitsSelector({
  celebritySubscriptionBenefits: { publicListSubscriptionBenefitsReducer },
}: RootState) {
  let status: StatusType = getStatus(publicListSubscriptionBenefitsReducer);

  const state: StateType = {
    benefits: publicListSubscriptionBenefitsReducer?.data?.results || [],
    totalResults: publicListSubscriptionBenefitsReducer?.data?.totalResults,
    currentParams: publicListSubscriptionBenefitsReducer?.data?.currentParams,
    status,
  };

  return state;
}

function usePublicListSubscriptionBenefits({
  celebrityId = defaultParams.celebrityId,
  limit = defaultParams.limit,
  shouldFetch = true,
}: { shouldFetch?: boolean } & ParamsType): StateType & {
  setOffset: (newOffset: number) => void;
} {
  const state = useSelector(publicListSubscriptionBenefitsSelector);
  const dispatch = useDispatch();
  const { currentParams } = state;
  const { offset } = currentParams;
  const hasFetchedRef = useRef(
    state.benefits?.length > 0 && currentParams?.celebrityId === celebrityId
  );

  useEffect(() => {
    if (!shouldFetch) return;
    if (hasFetchedRef.current) {
      hasFetchedRef.current = false;
      return;
    }
    const listParams = getObjectWithFallbackValues(
      {
        celebrityId,
        offset,
        limit,
      },
      defaultParams
    );
    dispatch(publicListSubscriptionBenefits(listParams));
  }, [celebrityId, dispatch, limit, offset, shouldFetch]);

  function setOffset(offset: number) {
    dispatch(setPublicListSubscriptionBenefitsOffset(offset));
  }

  return { ...state, setOffset };
}

export default usePublicListSubscriptionBenefits;
