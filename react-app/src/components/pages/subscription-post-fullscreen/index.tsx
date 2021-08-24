import { useGetSubscriptionPost } from "../../../../../lib/hooks/useGetSubscriptionPost";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import styles from "./styles.module.scss";
import Maybe from "../../common/helpers/maybe";
import { PostSlideshow } from "../../containers/celebrity-shared-post";
import { PostSingleMedia } from "react-app/src/components/common/cards/subscription-post-card";
import classes from "classnames";

type SubscriptionPostFullscreenProps = {
  postId: string;
};

function SubscriptionPostFullscreen({
  postId,
}: SubscriptionPostFullscreenProps) {
  const { post } = useGetSubscriptionPost(postId);
  const { description, urls } = post;

  return (
    <main className={styles.SubscriptionPostFullscreen}>
      <PageHeading />
      <div className={styles.MediaContainer}>
        <Maybe
          it={urls.length > 1}
          orElse={<PostSingleMedia media={urls[0]} />}
        >
          <PostSlideshow urls={urls} />
        </Maybe>
      </div>
      <div className={styles.ContentWrapper}>
        <div className={classes("container", styles.ContentContainer)}>
          <p className={styles.PostDescription}>{description}</p>
        </div>
      </div>
    </main>
  );
}

export { SubscriptionPostFullscreen };
