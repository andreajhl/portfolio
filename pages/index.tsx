import isMobile from "lib/utils/isMobile";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { fetchCelebritySections } from "react-app/src/state/ducks/celebrity-sections/actions";
import { wrapper } from "react-app/src/state/store";
import getCookie from "react-app/src/utils/getCookie";
import { useDesktopClass } from "../lib/hooks/useDesktopClass";
import UAParser from "ua-parser-js";
import debug from "react-app/src/utils/debug";
import { parse, serialize } from "cookie";

// import isBrowser from "react-app/src/utils/isBrowser";
// import auth0 from "../lib/auth0";

const HomePage = dynamic<{ userLocation: string }>(() =>
  import("desktop-app/components/pages/home").then((mod) => mod.HomePage)
);

const CelebritiesPage = dynamic<{ isMobile: boolean }>(() =>
  import("react-app/src/components/pages/celebrities").then(
    (mod) => mod.CelebritiesPage
  )
);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ req, store, query }) => {
    const cookies = parse(req?.headers?.cookie || "");

    await fetchCelebritySections({
      landingId: query.landingId,
      alpha2Code: cookies["userLocation"],
      limit: 10,
      offset: 0,
    })(store.dispatch);

    return {
      props: {
        isMobile: isMobile(req.headers["user-agent"]),
        userLocation: getCookie("userLocation", req?.headers?.cookie) || "",
      },
    };
  }
);

const Home = ({ isMobile, userLocation }) => {
  useDesktopClass(!isMobile);

  return (
    <>
      <CustomHead />
      <Maybe it={isMobile} orElse={<HomePage userLocation={userLocation} />}>
        <CelebritiesPage isMobile={isMobile} />
      </Maybe>
    </>
  );
};

export default Home;
