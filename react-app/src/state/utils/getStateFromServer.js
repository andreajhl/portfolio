export const getStateFromServer = (fromClient, fromServer) => {
  return {
    ...fromClient,
    celebritySections: {
      ...fromClient.celebritySections,
      fetchCelebritySectionsReducer:
        fromServer.celebritySections.fetchCelebritySectionsReducer
    },
    celebrities: {
      ...fromClient.celebrities,
      celebrityProfileVersionReducer:
        fromClient.celebrities.celebrityProfileVersionReducer ||
        fromServer.celebrities.celebrityProfileVersionReducer,
      getCelebrityReducer: fromServer.celebrities.getCelebrityReducer,
      fetchPublicContractsReducer:
        fromServer.celebrities.fetchPublicContractsReducer,
      fetchReviewsReducer: fromServer.celebrities.fetchReviewsReducer
    }
  };
};
