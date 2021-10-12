import Maybe from "desktop-app/components/common/helpers/maybe";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import isMobile from "lib/utils/isMobile";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import {
  resetSearchFilters,
  updateSearchFilters,
} from "react-app/src/state/ducks/search-filters/actions";
import { wrapper } from "react-app/src/state/store";
import { analytics } from "react-app/src/state/utils/gtm";
import { connect, ConnectedProps } from "react-redux";

const MobileSearchPage = dynamic(() =>
  import("react-app/src/components/pages/search").then((mod) => mod.SearchPage)
);

const DesktopSearchPage = dynamic(() =>
  import("desktop-app/components/pages/search").then((mod) => mod.SearchPage)
);

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
    updateSearchFilters(query, false)(store.dispatch, store.getState);

    return {
      props: {
        isMobile: isMobile(req.headers["user-agent"]),
        searchParams: query,
      },
    };
  }
);

const mapDispatchToProps = { updateSearchFilters, resetSearchFilters };
const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CelebritiesSearchResultsProps = {
  isMobile: boolean;
  searchParams: { [key: string]: any };
} & PropsFromRedux;

const CelebritiesSearchResults = ({
  isMobile,
  searchParams,
  resetSearchFilters,
}: CelebritiesSearchResultsProps) => {
  useDesktopClass(!isMobile);

  useEffect(() => {
    if (searchParams) {
      analytics.track("SEARCH_PARAMS_ON_LOAD", {
        searchParams,
        widget: "CelebritiesSearchResults",
      });
    }
    return () => {
      resetSearchFilters(false);
    };
  }, []);

  return (
    <>
      <CustomHead />
      <Maybe it={isMobile} orElse={<DesktopSearchPage />}>
        <MobileSearchPage />
      </Maybe>
    </>
  );
};

export default connector(CelebritiesSearchResults);
