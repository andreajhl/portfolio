import { SUBSCRIPTION_FEED } from "constants/paths";
import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionPostDetails } from "react-app/src/components/pages/subscription-post-details";

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

function PostDetails({ postId }) {
  return (
    <>
      <CustomHead />
      <SubscriptionPostDetails postId={postId} />
    </>
  );
}

export default PostDetails;
