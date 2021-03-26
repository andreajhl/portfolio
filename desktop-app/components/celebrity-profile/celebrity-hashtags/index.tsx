import styles from "./styles.module.scss";
import { Link } from "desktop-app/components/common/routing/link";
import { getSearchHashtagPath } from "constants/paths";
import { celebrityType } from "desktop-app/types/celebrityType";

type CelebrityHashtagsProps = Pick<celebrityType, "hashtags">;

function CelebrityHashtags({ hashtags }: CelebrityHashtagsProps) {
  return (
    <div className={styles.CelebrityHashtags}>
      {hashtags?.map?.((hashtag) => (
        <Link key={hashtag} href={getSearchHashtagPath(hashtag)}>
          <span>#{hashtag}</span>
        </Link>
      ))}
    </div>
  );
}

export { CelebrityHashtags };
