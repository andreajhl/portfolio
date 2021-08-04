import useFetchUserContractsLikes from "./useFetchUserCelebrityContractsLikes";
import useFetchUserCelebrityLikes from "./useFetchUserCelebrityLikes";

const globalFetchesReducerInitialState = {
  shouldFetchUserCelebrityLikes: true,
  shouldFetchUserContractsLikes: true,
};
type InitialValuesType = typeof globalFetchesReducerInitialState;
type GlobalFetchesType = {
  [Property in keyof InitialValuesType]?: InitialValuesType[Property];
};

type UseGlobalFetchesType = (globalFetches?: GlobalFetchesType) => void;

const useGlobalFetches: UseGlobalFetchesType = function ({
  shouldFetchUserCelebrityLikes,
  shouldFetchUserContractsLikes,
} = globalFetchesReducerInitialState) {
  useFetchUserCelebrityLikes(shouldFetchUserCelebrityLikes);
  useFetchUserContractsLikes(shouldFetchUserContractsLikes);
};

export default useGlobalFetches;
