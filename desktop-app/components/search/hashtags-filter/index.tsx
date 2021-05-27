import { HashtagType } from "desktop-app/types/hashtagType";
import { useEffect, useState } from "react";
import { RootState } from "react-app/src/state/store";
import { list } from "react-app/src/state/ducks/celebrity-hashtags/actions";
import { connect, ConnectedProps } from "react-redux";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

const mapStateToProps = ({
  celebrityHashtags,
}: RootState): { hashtags: HashtagType[] } => {
  return {
    hashtags: celebrityHashtags.listHashtagsReducer.data?.results,
  };
};

const mapDispatchToProps = {
  listHashtags: list,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type HashtagsFilterProps = {
  className?: string;
  searchFilters: { [key: string]: any };
  onChangeHashtags?: (hashtags: string[]) => void;
} & PropsFromRedux;

function HashtagsFilter({
  className = "",
  hashtags,
  listHashtags,
  searchFilters,
  onChangeHashtags = function () {},
}: HashtagsFilterProps) {
  const [selectedHashtags, setSelectedHashtags] = useState([]);

  useEffect(() => {
    listHashtags(searchFilters);
  }, [searchFilters]);

  useEffect(() => {
    onChangeHashtags(selectedHashtags);
  }, [selectedHashtags]);

  return (
    <Maybe it={hashtags?.length > 0}>
      <div className={`${styles.HashtagsFilter} ${className}`}>
        {hashtags
          .filter(({ name }) => !selectedHashtags.includes(name))
          .map(({ name, amount }) => (
            <div
              className={styles.HashtagsFilterHashtag}
              onClick={() =>
                setSelectedHashtags((hashtags) => [...hashtags, name])
              }
            >
              <span
                className={`text-with-ellipsis ${styles.HashtagsFilterHashtagName}`}
              >
                {name}
              </span>{" "}
              <span className={styles.HashtagsFilterHashtagCount}>
                {amount}
              </span>
            </div>
          ))}
      </div>
    </Maybe>
  );
}

const _HashtagsFilter = connector(HashtagsFilter);

export { _HashtagsFilter as HashtagsFilter };
