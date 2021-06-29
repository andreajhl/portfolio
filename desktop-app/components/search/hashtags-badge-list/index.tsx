import Reel from "desktop-app/components/layouts/reel";
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
      <Reel
        itemSize={110}
        height={28}
        scrollByOffset={10}
        itemCount={hashtags.length}
        width={250}
        buttonsStyle={{ size: 28, top: 14, transform: "translateY(-50%)" }}
        itemData={hashtags}
      >
        {({ data, index, style }) => {
          return (
            <div style={{ ...style, left: Number(style.left) + 10 * index }}>
              <Badge
                text={data[index]}
                onClick={() => removeHashtag(data[index])}
              />
            </div>
          );
        }}
      </Reel>
    </Maybe>
  );
}

export { HashtagsBadgeList };
