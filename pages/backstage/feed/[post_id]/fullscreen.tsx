import { SUBSCRIPTION_FEED } from "constants/paths";
import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionPostFullscreen } from "react-app/src/components/pages/subscription-post-fullscreen";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = params?.post_id;

  if (typeof postId === "undefined") {
    return {
      redirect: { destination: SUBSCRIPTION_FEED, permanent: false },
    };
  }
  return {
    props: {
      postId,
    },
  };
};

function PostFullscreen({ postId }) {
  return (
    <>
      <CustomHead />
      <SubscriptionPostFullscreen postId={postId} />
    </>
  );
}

export default PostFullscreen;
