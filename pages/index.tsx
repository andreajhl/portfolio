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
      },
    };
  }
);

function Home({ isMobile, userLocation }) {
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
