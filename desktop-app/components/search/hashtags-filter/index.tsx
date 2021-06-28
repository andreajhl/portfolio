import { HashtagType } from "desktop-app/types/hashtagType";
import { useEffect, useState } from "react";
import { RootState } from "react-app/src/state/store";
import { list } from "react-app/src/state/ducks/celebrity-hashtags/actions";
import { connect, ConnectedProps } from "react-redux";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";

const getHashtagsFromSearchFilters = (searchFilters) =>
  typeof searchFilters.hashtags === "string" && searchFilters.hashtags !== ""
    ? searchFilters.hashtags.split(",")
    : [];

const mapStateToProps = ({
  celebrityHashtags,
}: RootState): { searchHashtags: HashtagType[] } => {
  return {
    searchHashtags: celebrityHashtags.listHashtagsReducer.data?.results,
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
  searchHashtags,
  listHashtags,
  searchFilters,
  onChangeHashtags = function () {},
}: HashtagsFilterProps) {
  const [selectedHashtags, setSelectedHashtags] = useState([]);

  useEffect(() => {
    listHashtags(searchFilters);
    setSelectedHashtags(getHashtagsFromSearchFilters(searchFilters));
  }, [searchFilters]);

  const addHashtag = (name: string) => () =>
    setSelectedHashtags((hashtags) => {
      const newHashtags = [...hashtags, name];
      onChangeHashtags(newHashtags);
      return newHashtags;
    });

  const hashtagIsNotSelected = ({ name }: HashtagType): boolean =>
    !selectedHashtags.includes(name);

  return (
    <Maybe it={searchHashtags?.length > 0}>
      <div className={`${styles.HashtagsFilter} ${className}`}>
        {searchHashtags.filter(hashtagIsNotSelected).map(({ name, amount }) => (
          <div
            key={`${name}-${amount}`}
            className={styles.HashtagsFilterHashtag}
            onClick={addHashtag(name)}
          >
            <span
              className={`text-with-ellipsis ${styles.HashtagsFilterHashtagName}`}
            >
              {name}
            </span>{" "}
            <span className={styles.HashtagsFilterHashtagCount}>{amount}</span>
          </div>
        ))}
      </div>
    </Maybe>
  );
}

const _HashtagsFilter = connector(HashtagsFilter);

export { _HashtagsFilter as HashtagsFilter };
