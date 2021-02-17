export const getStateFromServer = (fromClient, fromServer) => {
  return {
    ...fromClient,
    celebritySections: {
      ...fromClient.celebritySections,
      fetchCelebritySectionsReducer: fromServer.celebritySections.fetchCelebritySectionsReducer
    },
    celebrities: {
      ...fromClient.celebrities,
      getCelebrityReducer: fromServer.celebrities.getCelebrityReducer
    }
  };
};
