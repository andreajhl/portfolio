// import { useEffect } from "react";
import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { CelebritiesPage } from "react-app/src/components/pages/celebrities";
import { fetchCelebritySections } from "react-app/src/state/ducks/celebrity-sections/actions";
import { wrapper } from "react-app/src/state/store";
import UAParser from "ua-parser-js";
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ req, store }) => {
    await fetchCelebritySections({ limit: 10, offset: 0 })(store.dispatch);

    // Detect UA
    let isMobile = false;
    try {
      isMobile = new UAParser(req.headers["user-agent"]).getDevice().type === "mobile";
    } catch (e) {
      throw "UA Parser error" + e;
    }

    // Return Props
    return {
      props: {
        isMobile: isMobile
      }
    };
  }
);

const Home = ({ isMobile }) => {
  // useEffect(() => {
  //   if (isBrowser && session) {
  //     if (session.idToken) {
  //       localStorage.setItem("_a0_", session.idToken);
  //     }
  //   }
  // }, []);

  return (
    <>
      <CustomHead />
      <CelebritiesPage isMobile={isMobile} />
    </>
  );
};

// This gets called on every request
// export async function getServerSideProps({ req, res }) {
//   if (typeof window === "undefined") {
//     const session = await auth0.getSession(req);
//     if (session) {
//       if (session) {
//         return {
//           props: { session: session }
//         };
//       }
//     }
//   }

//   return { props: {} };
// }

export default Home;
