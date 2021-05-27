import Badge from "../../common/badge";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

type HashtagsBadgeListProps = {
  hashtags: string[];
  onChangeHashtags?: (hashtags: string[]) => void;
};

function HashtagsBadgeList({
  hashtags,
  onChangeHashtags = function () {},
}: HashtagsBadgeListProps) {
  function removeHashtag(clickedHashtag: string) {
    onChangeHashtags(hashtags.filter((hashtag) => hashtag !== clickedHashtag));
  }
  return (
    <Maybe it={hashtags?.length > 0}>
      <div className={styles.HashtagsBadgeList}>
        {hashtags.map((hashtag) => (
          <Badge text={hashtag} onClick={() => removeHashtag(hashtag)} />
        ))}
      </div>
    </Maybe>
  );
}

export { HashtagsBadgeList };
