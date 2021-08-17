import styles from "./styles.module.scss";
import { Link } from "desktop-app/components/common/routing/link";
import { getSearchHashtagPath } from "constants/paths";
import { celebrityType } from "desktop-app/types/celebrityType";
import { getWindowPathname } from "react-app/src/utils/getWindow";
import { analytics } from "react-app/src/state/utils/gtm";

type CelebrityHashtagsProps = {
  celebrity: celebrityType;
};

function CelebrityHashtags({ celebrity }: CelebrityHashtagsProps) {
  const hashtags = celebrity?.hashtags || [];

  function trackHashtagClick(hashtag: string) {
    analytics.track("CLICK_CELEBRITY_PROFILE_HASHTAG", {
      widget: "CelebrityHashtags",
      path: getWindowPathname(),
      celebrity,
      hashtag,
    });
  }

  return (
    <div className={styles.CelebrityHashtags}>
      {hashtags?.map?.((hashtag) => (
        <Link
          key={hashtag}
          href={getSearchHashtagPath(hashtag)}
          onClick={() => trackHashtagClick(hashtag)}
        >
          <span>#{hashtag}</span>
        </Link>
      ))}
    </div>
  );
}

export { CelebrityHashtags };
