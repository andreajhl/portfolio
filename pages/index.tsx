import { useEffect } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { fetchCelebritySections } from "react-app/src/state/ducks/celebrity-sections/actions";
import { wrapper } from "react-app/src/state/store";
import isMobile from "../lib/utils/isMobile";

const CelebritiesPage = dynamic<{ isMobile: boolean }>(() =>
  import("react-app/src/components/pages/celebrities").then(
    (mod) => mod.CelebritiesPage
  )
);

const HomePage = dynamic(() =>
  import("desktop-app/components/pages/home").then((mod) => mod.HomePage)
);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ req, store }) => {
    await fetchCelebritySections({ limit: 4, offset: 0 })(store.dispatch);
    return {
      props: {
        isMobile: isMobile(req)
      }
    };
  }
);

const Home = ({ isMobile }) => {
  useEffect(() => {
    if (isMobile) return;
    document.documentElement.classList.add("desktop");
    return () => {
      document.documentElement.classList.remove("desktop");
    };
  }, []);

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
