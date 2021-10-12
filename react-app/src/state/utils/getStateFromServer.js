export const getStateFromServer = (fromClient, fromServer) => {
  console.log({ fromServer });
  return {
    ...fromClient,
    celebritySections: {
      ...fromClient.celebritySections,
      fetchCelebritySectionsReducer:
        fromServer.celebritySections.fetchCelebritySectionsReducer,
    },
    landings: {
      ...fromClient.landings,
      fetchLandingsReducer: fromServer.landings.fetchLandingsReducer,
    },
    searchFilters: {
      ...fromServer.searchFilters,
    },
    celebrities: {
      ...fromClient.celebrities,
      celebrityProfileVersionReducer:
        fromClient.celebrities.celebrityProfileVersionReducer ||
        fromServer.celebrities.celebrityProfileVersionReducer,
      getCelebrityReducer: fromServer.celebrities.getCelebrityReducer,
      fetchPublicContractsReducer:
        fromServer.celebrities.fetchPublicContractsReducer,
      fetchReviewsReducer: fromServer.celebrities.fetchReviewsReducer,
    },
  };
};
