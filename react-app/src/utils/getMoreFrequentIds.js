const getMoreFrequentIds = (celebrities = [], propertyName) => {
  const idsCount = celebrities.reduce((idsCount, celebrity) => {
    const celebrityPropertyValue = celebrity[propertyName];
    if (idsCount[celebrityPropertyValue]) {
      return {
        ...idsCount,
        [celebrityPropertyValue]: idsCount[celebrityPropertyValue] + 1
      };
    } else {
      return {
        ...idsCount,
        [celebrityPropertyValue]: 1
      };
    }
  }, {});
  return Object.entries(idsCount)
    .sort(([, firstEntry], [, secondEntry]) => secondEntry - firstEntry)
    .slice(0, 3)
    .map(([value]) => value)
    .join(",");
};

export default getMoreFrequentIds;
