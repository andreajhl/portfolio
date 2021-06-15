// import { useEffect } from "react";
import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { CelebritiesPage } from "react-app/src/components/pages/celebrities";
import { fetchCelebritySections } from "react-app/src/state/ducks/celebrity-sections/actions";
import { wrapper } from "react-app/src/state/store";
import debug from "react-app/src/utils/debug";
import UAParser from "ua-parser-js";
import { parse, serialize } from "cookie";
import { OFFSET_ROTATE_CELEBRITIES_SECTIONS } from "constants/keys";
import { setCookie } from "lib/setCookie";
import { useEffect } from "react";

// import isBrowser from "react-app/src/utils/isBrowser";
// import auth0 from "../lib/auth0";

/* 
export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  async ({ store }) => {
    await fetchCelebritySections({ limit: 4, offset: 0 })(store.dispatch);
    const quarterHourInSeconds = 900;
    return { revalidate: quarterHourInSeconds };
  }
);
*/

const generateRandomNumber = (limit) => Math.floor(Math.random() * limit + 1);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ req, store, query, res }) => {
    const cookies = parse(req?.headers?.cookie || "");
    let rotationForCelebritiesSections =
      cookies[OFFSET_ROTATE_CELEBRITIES_SECTIONS];

    if (!cookies[OFFSET_ROTATE_CELEBRITIES_SECTIONS]) {
      rotationForCelebritiesSections = generateRandomNumber(100);
    }

    await fetchCelebritySections(
      {
        landingId: query.landingId,
        alpha2Code: cookies["userLocation"],
        limit: 10,
        offset: 0
      },
      rotationForCelebritiesSections |
        cookies[OFFSET_ROTATE_CELEBRITIES_SECTIONS]
    )(store.dispatch);

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
        isMobile,
        rotationForCelebritiesSections
      }
    };
  }
);

function Home({ isMobile, rotationForCelebritiesSections }) {
  useEffect(() => {
    setCookie(
      OFFSET_ROTATE_CELEBRITIES_SECTIONS,
      rotationForCelebritiesSections
    );
  }, []);
  return (
    <>
      <CustomHead />
      <CelebritiesPage isMobile={isMobile} />
    </>
  );
}

export default Home;
