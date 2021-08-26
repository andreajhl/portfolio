import { PageContainer } from "../../layouts/page-container";
import { useGetSubscriptionPost } from "../../../../../lib/hooks/useGetSubscriptionPost";
import {
  SubscriptionPostCard,
  SubscriptionPostContent,
} from "../../common/cards/subscription-post-card";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import styles from "./styles.module.scss";

type SubscriptionPostDetailsProps = {
  postId: string;
};

function SubscriptionPostDetails({ postId }: SubscriptionPostDetailsProps) {
  const { post, status } = useGetSubscriptionPost(postId);
  const {
    celebrityAvatar,
    celebrityFullName,
    celebrityUsername,
    id,
    createdAt: created,
    description,
    items: urls,
    celebrityId,
  } = post;

  return (
    <PageContainer showSearch={false} showNavbar={false}>
      <PageHeading />
      <SubscriptionPostCard
        className={styles.SubscriptionPostDetails}
        avatar={celebrityAvatar}
        fullName={celebrityFullName}
        username={celebrityUsername}
        date={created}
        key={id}
      >
        <SubscriptionPostContent urls={urls} description={description} />
      </SubscriptionPostCard>
    </PageContainer>
  );
}

export { SubscriptionPostDetails };
