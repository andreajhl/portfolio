const isAlreadySubscribe = (
  subscriptionList: any[],
  celebrityUsername: string | string[]
): boolean => {
  return Boolean(
    subscriptionList.find(
      (subscription: { celebrityUsername: any }) =>
        subscription.celebrityUsername === celebrityUsername
    )
  );
};

export default isAlreadySubscribe;
