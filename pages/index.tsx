import isMobileDevice from "lib/utils/isMobile";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { wrapper } from "react-app/src/state/store";
import getCookie from "react-app/src/utils/getCookie";
import { fetchLandings } from "react-app/src/state/ducks/landings/actions";
import { fetchCelebritySections } from "react-app/src/state/ducks/celebrity-sections/actions";
import { parse } from "cookie";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { OFFSET_ROTATE_CELEBRITIES_SECTIONS } from "constants/keys";
import { setCookie } from "lib/setCookie";
import { useEffect } from "react";

const generateRandomNumber = (limit) => Math.floor(Math.random() * limit + 1);

const HomePage = dynamic<{ userLocation: string }>(() =>
  import("desktop-app/components/pages/home").then((mod) => mod.HomePage)
);

const CelebritiesPage = dynamic<{ isMobile: boolean }>(() =>
  import("react-app/src/components/pages/celebrities").then(
    (mod) => mod.CelebritiesPage
  )
);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ req, store, query, res }) => {
    const cookies = parse(req?.headers?.cookie || "");

    let rotationForCelebritiesSections =
      cookies[OFFSET_ROTATE_CELEBRITIES_SECTIONS];

    if (!cookies[OFFSET_ROTATE_CELEBRITIES_SECTIONS]) {
      rotationForCelebritiesSections = generateRandomNumber(100);
    }

    // Detect UA
    let isMobile = false;
    try {
      isMobile = isMobileDevice(req.headers["user-agent"]);
    } catch (e) {
      throw new Error("UA Parser error" + e);
    }

    const fetchAction = isMobile ? fetchCelebritySections : fetchLandings;

    await fetchAction({
      landingId: query.landingId,
      alpha2Code: cookies["userLocation"],
      limit: 10,
      offset: 0,
    })(store.dispatch);

    return {
      props: {
        isMobile,
        userLocation: getCookie("userLocation", req?.headers?.cookie) || "",
        rotationForCelebritiesSections,
      },
    };
  }
);

function Home({ isMobile, userLocation, rotationForCelebritiesSections }) {
  useDesktopClass(!isMobile);
  useEffect(() => {
    setCookie(
      OFFSET_ROTATE_CELEBRITIES_SECTIONS,
      rotationForCelebritiesSections
    );
  }, []);
  return (
    <>
      <CustomHead />
      <Maybe it={isMobile} orElse={<HomePage userLocation={userLocation} />}>
        <CelebritiesPage isMobile={isMobile} />
      </Maybe>
    </>
  );
}

export default Home;
