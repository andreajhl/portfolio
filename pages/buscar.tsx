import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { CelebritiesResultsPage } from "react-app/src/components/pages/celebrities-results";
import { wrapper } from "react-app/src/state/store";
import debug from "react-app/src/utils/debug";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";

const allowedParams = [
  "search",
  "limit",
  "offset",
  "country_id",
  "category_id",
  "orderBy"
];

const listParamsInitialKeys = ["offset", "limit"];

const hasSearched = (listParams) => {
  const listParamsEntries = Object.entries(listParams);
  return listParamsEntries.some(
    ([key, value]) => !listParamsInitialKeys.includes(key) && Boolean(value)
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ query, store }) => {
    try {
      const listParams = pickPropertiesFromAObject(query, allowedParams);
      if (Object.keys(listParams).length === 0 || !hasSearched(listParams)) {
        const previousPath = store.getState()?.celebrities?.previousPathReducer
          ?.pathname;
        return {
          redirect: {
            destination: previousPath,
            permanent: false
          }
        };
      }
    } catch {
      debug("ERROR getServerSideProps");
      return {
        props: {}
      };
    }

    // await list(listParams)(store.dispatch, store.getState);
  }
);

const CelebritiesSearchResults = () => {
  return (
    <>
      <CustomHead />
      <CelebritiesResultsPage />
    </>
  );
};

export default CelebritiesSearchResults;
