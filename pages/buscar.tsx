import Maybe from "desktop-app/components/common/helpers/maybe";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import isMobile from "lib/utils/isMobile";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { updateSearchFilters } from "react-app/src/state/ducks/search-filters/actions";
// import { CelebritiesResultsPage } from "react-app/src/components/pages/celebrities-results";
import { wrapper } from "react-app/src/state/store";
import debug from "react-app/src/utils/debug";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { connect } from "react-redux";

const allowedParams = [
  "search",
  "limit",
  "offset",
  "country_id",
  "category_id",
  "orderBy",
];

const listParamsInitialKeys = ["offset", "limit"];

const hasSearched = (listParams) => {
  const listParamsEntries = Object.entries(listParams);
  return listParamsEntries.some(
    ([key, value]) => !listParamsInitialKeys.includes(key) && Boolean(value)
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ query, store, req }) => {
    // Para re-direccionar cuando no haya search. Comentado para versión nueva.
    // const listParams = pickPropertiesFromAObject(query, allowedParams);

    // const listParams = pickPropertiesFromAObject(query, allowedParams);
    // if (Object.keys(listParams).length === 0 || !hasSearched(listParams)) {
    //   const previousPath = store.getState()?.celebrities?.previousPathReducer
    //     ?.pathname;
    //   return {
    //     redirect: {
    //       destination: previousPath,
    //       permanent: false,
    //     },
    //   };
    // }
    // await list(listParams)(store.dispatch, store.getState);

    return {
      props: {
        isMobile: isMobile(req.headers["user-agent"]),
        searchParams: query,
      },
    };
  }
);

const CelebritiesResultsPage = dynamic(() =>
  import("react-app/src/components/pages/celebrities-results").then(
    (mod) => mod.CelebritiesResultsPage
  )
);

const DesktopSearchPage = dynamic(() =>
  import("desktop-app/components/pages/search").then((mod) => mod.SearchPage)
);

const CelebritiesSearchResults = ({
  isMobile,
  searchParams,
  updateSearchFilters,
}) => {
  useDesktopClass(!isMobile);

  useEffect(() => {
    if (!searchParams) return;
    updateSearchFilters(searchParams, false);
  }, []);

  return (
    <>
      <CustomHead />
      <Maybe it={isMobile} orElse={<DesktopSearchPage />}>
        <CelebritiesResultsPage />
      </Maybe>
    </>
  );
};

export default connect(null, { updateSearchFilters })(CelebritiesSearchResults);
