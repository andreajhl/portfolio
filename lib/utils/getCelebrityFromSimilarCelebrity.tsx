export const getCelebrityFromSimilarCelebrity = ({
  celebrityId,
  celebrityUsername,
  celebrityFullName,
  celebrityAvatar,
  celebrityHashTags,
  videoMessagePrice,
  availableForFlashDeliveries,
  countryCode,
  categoryId,
  categoryTitle
}: any) => {
  return {
    id: celebrityId,
    avatar: celebrityAvatar,
    username: celebrityUsername,
    fullName: celebrityFullName,
    hashtags: celebrityHashTags,
    videoMessagePrice,
    availableForFlashDeliveries,
    countryCode,
    categoryId,
    title: categoryTitle
  };
};
