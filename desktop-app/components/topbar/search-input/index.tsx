import { getCelebrityProfilePath, SEARCH_PATH } from "constants/paths";
import { SearchIcon } from "desktop-app/components/common/icons";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import debounce from "lodash.debounce";
import { SEARCH_LIST } from "react-app/src/state/ducks/celebrities/paths";
import axios from "axios";
import Link from "next/link";
import useStatus from "lib/hooks/useStatus";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { SkeletonTopbarSearchInput } from "./skeleton";

const FINAL_PATH = process.env.NEXT_PUBLIC_ENDPOINT + SEARCH_LIST;

function TopbarSearchInput() {
  const router = useRouter();
  const [status, setStatus] = useStatus("idle");
  const [showResults, setShowResults] = useState(false);
  const [resultsQuery, setResultsQuery] = useState([]);
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const getResults = useCallback(
    debounce((query) => {
      setStatus("loading");
      if (query !== "") {
        axios
          .get(FINAL_PATH, {
            params: {
              search: query,
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
    router.push({
      pathname: SEARCH_PATH,
      query: {
        limit: 10,
        search: String(currentQuery),
      },
    });
  };

  return (
    <div className={styles.TopBarSearch}>
      <input
        autoComplete="off"
        onBlur={() => setShowResults(false)}
        onFocus={() => setShowResults(true)}
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
      {showResults && currentQuery !== "" ? (
        <div className={styles.SearchPreviewResults}>
          <Maybe it={status === "completed"}>
            <div className={styles.ResultsHeader}>
              <span>
                {resultsQuery.length <= 0
                  ? "No se encontraron resultados para: "
                  : "Resultados para: "}
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
                  <Link href={getCelebrityProfilePath(result.username)}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className={styles.AnchorTagResult}>
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
                    </a>
                  </Link>
                ))
              : null}
          </Maybe>
        </div>
      ) : null}
    </div>
  );
}

export { TopbarSearchInput };
