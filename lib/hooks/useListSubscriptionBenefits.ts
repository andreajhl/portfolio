import getObjectWithFallbackValues from "lib/utils/getObjectWithFallbackValues";
import { useEffect, useRef } from "react";
import {
  listSubscriptionBenefits,
  setListSubscriptionBenefitsOffset,
} from "react-app/src/state/ducks/celebrity-subscription-benefits/actions";
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
  currentParams: ParamsType;
};

function listSubscriptionBenefitsSelector({
  celebritySubscriptionBenefits: { listSubscriptionBenefitsReducer },
}: RootState) {
  let status: StatusType = getStatus(listSubscriptionBenefitsReducer);

  const state: StateType = {
    benefits: listSubscriptionBenefitsReducer?.data?.results || [],
    totalResults: listSubscriptionBenefitsReducer?.data?.totalResults,
    currentParams: listSubscriptionBenefitsReducer?.data?.currentParams,
    status,
  };

  return state;
}

function useListSubscriptionBenefits({
  celebrityId = defaultParams.celebrityId,
  limit = defaultParams.limit,
  shouldFetch = true,
}: { shouldFetch?: boolean } & ParamsType): StateType & {
  setOffset: (newOffset: number) => void;
} {
  const state = useSelector(listSubscriptionBenefitsSelector);
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
    dispatch(listSubscriptionBenefits(listParams));
  }, [celebrityId, dispatch, limit, offset, shouldFetch]);

  function setOffset(offset: number) {
    dispatch(setListSubscriptionBenefitsOffset(offset));
  }

  return { ...state, setOffset };
}

export default useListSubscriptionBenefits;
