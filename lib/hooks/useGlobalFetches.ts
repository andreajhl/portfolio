import useFetchUserCelebrityLikes from "./useFetchUserCelebrityLikes";

const globalFetchesReducerInitialState = {
  shouldFetchUserCelebrityLikes: false,
};
type InitialValuesType = typeof globalFetchesReducerInitialState;
type GlobalFetchesType = {
  [Property in keyof InitialValuesType]?: InitialValuesType[Property];
};

type UseGlobalFetchesType = (globalFetches: GlobalFetchesType) => void;

const useGlobalFetches: UseGlobalFetchesType = function ({
  shouldFetchUserCelebrityLikes,
} = globalFetchesReducerInitialState) {
  useFetchUserCelebrityLikes(shouldFetchUserCelebrityLikes);
};

export default useGlobalFetches;
