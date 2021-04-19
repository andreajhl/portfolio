import { celebrityType } from "desktop-app/types/celebrityType";
import objectHasProperties from "lib/utils/objectHasProperties";
import { connect } from "react-redux";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

type HashtagsObjectType = {
  [key: string]: number;
};

const mapStateToProps = ({ celebrities }) => {
  const hashtags: HashtagsObjectType = celebrities.fetchCelebritiesReducer.data.results.reduce(
    (hashtags: HashtagsObjectType, celebrity: celebrityType) => {
      celebrity.hashtags
        .map((hashtag) => hashtag.trim().replace("#", "").toLowerCase())
        .forEach((hashtag) => {
          if (hashtags[hashtag]) {
            hashtags[hashtag]++;
          } else {
            hashtags[hashtag] = 1;
          }
        });

      return hashtags;
    },
    {}
  );

  const orderedHashtags = Object.fromEntries(
    Object.entries(hashtags)
      .slice(0, 15)
      .sort(
        ([_firstHashtag, firstCount], [_lastHashtag, lastCount]) =>
          lastCount - firstCount
      )
  );

  return {
    hashtags: orderedHashtags
  };
};

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type HashtagsFilterProps = {
  className?: string;
  onHashtagClick?: (hashtag: string) => void;
} & StateProps &
  DispatchProps;

function HashtagsFilter({
  className = "",
  hashtags,
  onHashtagClick = function () {}
}: HashtagsFilterProps) {
  return (
    <Maybe it={objectHasProperties(hashtags)}>
      <div className={`${styles.HashtagsFilter} ${className}`}>
        {Object.entries(hashtags).map(([hashtag, count]: [string, number]) => (
          <div
            className={styles.HashtagsFilterHashtag}
            onClick={() => onHashtagClick(hashtag)}
          >
            {hashtag}{" "}
            <span className={styles.HashtagsFilterHashtagCount}>{count}</span>
          </div>
        ))}
      </div>
    </Maybe>
  );
}

const _HashtagsFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(HashtagsFilter);

export { _HashtagsFilter as HashtagsFilter };
