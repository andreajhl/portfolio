import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionFeed } from "react-app/src/components/pages/subscription-feed";

const Feed = () => {
  return (
    <>
      <CustomHead description="Las ultimas publicaciones de tus famosos favoritos." />
      <SubscriptionFeed />
    </>
  );
};

export default Feed;
