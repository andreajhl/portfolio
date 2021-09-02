export const mergePreviousResults = ({ payload }, previousState) => {
  const results = [];
  const hasOffset = payload?.config?.params?.offset > 0;

  if (hasOffset) {
    results.push(...previousState.data.results);
  }

  results.push(...payload.data.results);
  return { ...payload.data, results };
};
