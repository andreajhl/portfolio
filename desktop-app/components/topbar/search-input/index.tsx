import { getCelebrityProfilePath, getSearchPath } from "constants/paths";
import { SearchIcon } from "desktop-app/components/common/icons";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import debounce from "lodash.debounce";
import { SEARCH_LIST } from "react-app/src/state/ducks/celebrities/paths";
import axios from "axios";
import useStatus from "lib/hooks/useStatus";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { SkeletonTopbarSearchInput } from "./skeleton";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "desktop-app/components/common/routing/link";
import { analytics } from "react-app/src/state/utils/gtm";
import { FormattedMessage } from "react-intl";
import { getWindowPathname } from "react-app/src/utils/getWindow";
import { celebrityType } from "desktop-app/types/celebrityType";

const FINAL_PATH = process.env.NEXT_PUBLIC_ENDPOINT + SEARCH_LIST;

const connector = connect(null, { updateSearchFilters });

type PropsFromRedux = ConnectedProps<typeof connector>;

function TopbarSearchInput({ updateSearchFilters }: PropsFromRedux) {
  const { push, query } = useRouter();
  const [status, setStatus] = useStatus("idle");
  const [resultsQuery, setResultsQuery] = useState([]);
  const [currentQuery, setCurrentQuery] = useState<string>(
    String(query?.search || "")
  );

  const analyticsData = {
    widget: "TopbarSearchInput",
    path: getWindowPathname(),
    currentQuery,
  };

  const getResults = useCallback(
    debounce((query) => {
      setStatus("loading");
      if (query !== "") {
        analytics.track("TOP_BAR_SEARCH_CHANGE", { ...analyticsData, query });
        axios
          .get(FINAL_PATH, {
            params: {
              search: query,
              limit: 7,
            },
          })
          .then((response) => {
            setResultsQuery(response.data.results);
            setStatus("completed");
          })
          .catch((e) => console.log(e));
      } else {
        setResultsQuery([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    getResults(currentQuery);
  }, [currentQuery]);

  const goToSearch = () => {
    if (!currentQuery) return;
    updateSearchFilters({
      search: currentQuery,
    });
    push(
      getSearchPath({
        search: String(currentQuery),
      })
    );
    trackSearch();
  };

  function trackSearch() {
    analytics.track("TOP_BAR_SEARCH_SUBMIT", analyticsData);
  }

  const getTrackResultClick = (celebrity: celebrityType) =>
    function trackResultClick() {
      analytics.track("CLICK_ON_CELEBRITY_FROM_SEARCH_RESULTS", {
        ...analyticsData,
        celebrity,
      });
    };

  return (
    <div className={styles.TopBarSearch}>
      <input
        autoComplete="off"
        className={styles.TopBarSearchInput}
        type="text"
        value={currentQuery}
        name="TopBarSearchInput"
        onChange={(e) => setCurrentQuery(e.target.value)}
        onKeyUp={(event) => {
          if (event.key === "Enter") goToSearch();
        }}
        id="TopBarSearchInput"
      />
      <SearchIcon className={styles.TopBarSearchIcon} />
      {currentQuery !== "" ? (
        <div className={styles.SearchPreviewResults}>
          <Maybe it={status === "completed"}>
            <div className={styles.ResultsHeader}>
              <span>
                {resultsQuery.length <= 0 ? (
                  <FormattedMessage defaultMessage="No se encontraron resultados para: " />
                ) : (
                  <FormattedMessage defaultMessage="Resultados para: " />
                )}
              </span>
              <span className={styles.QueryWords}>{currentQuery}</span>
            </div>
          </Maybe>
          <Maybe
            it={status === "completed"}
            orElse={<SkeletonTopbarSearchInput />}
          >
            {resultsQuery.length > 0
              ? resultsQuery.map((result) => (
                  <Link
                    className={styles.AnchorTagResult}
                    href={getCelebrityProfilePath(result.username)}
                    onClick={getTrackResultClick(result)}
                  >
                    <div
                      key={result.fullName}
                      className={styles.PreviewResultItem}
                    >
                      <img
                        src={result.avatar}
                        alt={result.fullName}
                        className={styles.AvatarCelebrity}
                      ></img>
                      <div className={styles.CelebrityInfo}>
                        <span className={styles.CelebrityName}>
                          {result.fullName}
                        </span>
                        <span className={styles.CelebrityCategory}>
                          {result.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              : null}
            <Link
              href={getSearchPath({
                search: String(currentQuery),
              })}
              onClick={trackSearch}
            >
              <div className={styles.SectionCTASeeMore}>
                <SearchIcon className={styles.SeeMoreIcon} />
                <FormattedMessage
                  defaultMessage={`Ver mas resultados para "{currentQuery}"`}
                  values={{ currentQuery }}
                />
              </div>
            </Link>
          </Maybe>
        </div>
      ) : null}
    </div>
  );
}

const _TopbarSearchInput = connector(TopbarSearchInput);

export { _TopbarSearchInput as TopbarSearchInput };
