// import { useEffect } from "react";
import { GetStaticProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { CelebritiesPage } from "react-app/src/components/pages/celebrities";
import { fetchCelebritySections } from "react-app/src/state/ducks/celebrity-sections/actions";
import { wrapper } from "react-app/src/state/store";
// import isBrowser from "react-app/src/utils/isBrowser";
// import auth0 from "../lib/auth0";

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  async ({ store }) => {
    await fetchCelebritySections({ limit: 4, offset: 0 })(store.dispatch);
    const quarterHourInSeconds = 900;
    return { revalidate: quarterHourInSeconds };
  }
);

const Home = ({ session }) => {
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
      <CelebritiesPage />
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
