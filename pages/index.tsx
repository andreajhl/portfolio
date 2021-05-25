// import { useEffect } from "react";
import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { CelebritiesPage } from "react-app/src/components/pages/celebrities";
import { fetchCelebritySections } from "react-app/src/state/ducks/celebrity-sections/actions";
import { wrapper } from "react-app/src/state/store";
import debug from "react-app/src/utils/debug";
import UAParser from "ua-parser-js";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ req, store }) => {
    await fetchCelebritySections({ limit: 10, offset: 0 })(store.dispatch);

    let isMobile = false;
    try {
      isMobile =
        new UAParser(req?.headers?.["user-agent"])?.getDevice?.()?.type ===
        "mobile";
    } catch (error) {
      debug(`UA Parser error: ${error}`);
    }

    return {
      props: {
        isMobile
      }
    };
  }
);

function Home({ isMobile }) {
  return (
    <>
      <CustomHead />
      <CelebritiesPage isMobile={isMobile} />
    </>
  );
}

export default Home;
