import isMobileDevice from "lib/utils/isMobile";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { wrapper } from "react-app/src/state/store";
import { fetchLandings } from "react-app/src/state/ducks/landings/actions";
import { fetchCelebritySections } from "react-app/src/state/ducks/celebrity-sections/actions";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import debug from "react-app/src/utils/debug";
import { parse } from "cookie";
import {
  OFFSET_ROTATE_CELEBRITIES_SECTIONS,
  USER_CURRENCY_CODE,
  USER_GEOLOCATION_KEY,
  USER_IP_ADDRESS,
  USER_LOCATION_KEY
} from "constants/keys";
import { setCookie } from "lib/setCookie";
import { useEffect } from "react";
import { getLocationCookieHeader } from "lib/getLocationCookieHeader";
import isBot from "isbot";

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
    let userLocation = cookies[USER_LOCATION_KEY];
    if (!userLocation) {
      if (isBot(req.headers["user-agent"])) {
        return debug("Este es un bot solicitando en Homepage GSSP", req.url);
      } else {
        const locationCookies = await getLocationCookieHeader(req);
        debug("getLocationCookieHeader() GSSP response");
        res.setHeader(USER_IP_ADDRESS, locationCookies.userIpAddressLocation);
        res.setHeader(USER_LOCATION_KEY, locationCookies.country_code);
        res.setHeader(USER_CURRENCY_CODE, locationCookies.currency_code);
        res.setHeader(USER_GEOLOCATION_KEY, locationCookies.geolocation);
        userLocation = locationCookies.country_code;
      }
    }
    let rotationForCelebritiesSections =
      cookies[OFFSET_ROTATE_CELEBRITIES_SECTIONS];

    if (!cookies[OFFSET_ROTATE_CELEBRITIES_SECTIONS]) {
      rotationForCelebritiesSections = String(generateRandomNumber(100));
    }

    // Detect UA
    let isMobile = false;
    try {
      isMobile = isMobileDevice(req.headers["user-agent"]);
    } catch (e) {
      throw new Error("UA Parser error" + e);
    }

    if (isMobile) {
      await fetchCelebritySections(
        {
          landingId: query.landingId,
          alpha2Code: userLocation,
          limit: 10,
          offset: 0
        },
        rotationForCelebritiesSections ||
        cookies[OFFSET_ROTATE_CELEBRITIES_SECTIONS]
      )(store.dispatch);
    } else {
      await fetchLandings({
        landingId: query.landingId,
        alpha2Code: userLocation,
        limit: 10,
        offset: 0
      })(store.dispatch);
    }

    return {
      props: {
        isMobile,
        userLocation,
        rotationForCelebritiesSections
      }
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
