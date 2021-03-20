import isMobile from "lib/utils/isMobile";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { fetchCelebritySections } from "react-app/src/state/ducks/celebrity-sections/actions";
import { wrapper } from "react-app/src/state/store";
import { useDesktopClass } from "../lib/utils/useDesktopClass";

const HomePage = dynamic(() =>
  import("desktop-app/components/pages/home").then((mod) => mod.HomePage)
);

const CelebritiesPage = dynamic<{ isMobile: boolean }>(() =>
  import("react-app/src/components/pages/celebrities").then(
    (mod) => mod.CelebritiesPage
  )
);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ req, store }) => {
    await fetchCelebritySections({ limit: 4, offset: 0 })(store.dispatch);
    return {
      props: {
        isMobile: isMobile(req.headers["user-agent"])
      }
    };
  }
);

const Home = ({ isMobile }) => {
  useDesktopClass(isMobile);

  return (
    <>
      <CustomHead />
      <Maybe it={isMobile} orElse={<HomePage />}>
        <CelebritiesPage isMobile={isMobile} />
      </Maybe>
    </>
  );
};

export default Home;


