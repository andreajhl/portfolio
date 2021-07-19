import Reel from "desktop-app/components/layouts/reel";
import Badge from "../../common/badge";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";
import classes from "classnames";
import { useEffect, useRef, useState } from "react";

const reelButtonsStyles = { size: 28, top: 14, transform: "translateY(-50%)" };

const initialListWidth = 300;

type HashtagsBadgeListProps = {
  className?: string;
  hashtags: string[];
  onChangeHashtags?: (hashtags: string[]) => void;
};

function HashtagsBadgeList({
  className,
  hashtags,
  onChangeHashtags = function () {},
}: HashtagsBadgeListProps) {
  const listRef = useRef<HTMLDivElement>();
  const [listWidth, setListWidth] = useState(initialListWidth);
  const [shouldRenderReel, setShouldRenderReel] = useState(false);

  useEffect(() => {
    if (!listRef.current) return;
    const listRefWidth = listRef?.current?.offsetWidth;
    const listRefScrollWidth = listRef?.current?.scrollWidth;
    const shouldRenderReel = listRefScrollWidth > listRefWidth;
    setShouldRenderReel(shouldRenderReel);
    setListWidth(listRefWidth);
  }, []);

  function removeHashtag(clickedHashtag: string) {
    onChangeHashtags(hashtags.filter((hashtag) => hashtag !== clickedHashtag));
  }

  return (
    <Maybe it={hashtags?.length > 0}>
      <div
        className={classes(
          styles.HashtagsBadgeList,
          shouldRenderReel && styles.HashtagsBadgeListWithReel,
          className
        )}
        ref={listRef}
      >
        <Maybe
          it={shouldRenderReel}
          orElse={hashtags.map((hashtag) => (
            <Badge text={hashtag} onClick={() => removeHashtag(hashtag)} />
          ))}
        >
          <Reel
            itemSize={120}
            height={28}
            scrollByOffset={10}
            itemCount={hashtags.length}
            width={listWidth}
            buttonsStyle={reelButtonsStyles}
            itemData={hashtags}
          >
            {({ data, index, style }) => {
              const hashtag = data[index];
              return (
                <div
                  style={{ ...style, left: Number(style.left) + 10 * index }}
                >
                  <Badge
                    text={hashtag}
                    onClick={() => removeHashtag(hashtag)}
                  />
                </div>
              );
            }}
          </Reel>
        </Maybe>
      </div>
    </Maybe>
  );
}

export { HashtagsBadgeList };
