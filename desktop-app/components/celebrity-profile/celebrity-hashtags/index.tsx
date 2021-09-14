import styles from "./styles.module.scss";
import { Link } from "desktop-app/components/common/routing/link";
import { getSearchHashtagPath, getSearchKeywordPath } from "constants/paths";
import { celebrityType } from "desktop-app/types/celebrityType";
import { getWindowPathname } from "react-app/src/utils/getWindow";
import { analytics } from "react-app/src/state/utils/gtm";
import classes from "classnames";
import { useIsOnMobileScreen } from "lib/is-on-mobile-screen";

type CelebrityHashtagsProps = {
  className?: string;
  celebrity: celebrityType;
};

function CelebrityHashtags({ className, celebrity }: CelebrityHashtagsProps) {
  const isMobile = useIsOnMobileScreen();
  const hashtags = celebrity?.hashtags || [];

  function trackHashtagClick(hashtag: string) {
    analytics.track("CLICK_CELEBRITY_PROFILE_HASHTAG", {
      widget: "CelebrityHashtags",
      path: getWindowPathname(),
      celebrity,
      hashtag,
      isMobile,
    });
  }

  if (!Array.isArray(hashtags) || hashtags?.length < 1) return null;

  return (
    <div className={classes(styles.CelebrityHashtags, className)}>
      {hashtags?.map?.((hashtag) => {
        const hashtagHref = isMobile
          ? getSearchKeywordPath(hashtag.replace(/#/g, ""))
          : getSearchHashtagPath(hashtag);

        return (
          <Link
            key={hashtag}
            href={hashtagHref}
            onClick={() => trackHashtagClick(hashtag)}
          >
            <span>#{hashtag}</span>
          </Link>
        );
      })}
    </div>
  );
}

export { CelebrityHashtags };
