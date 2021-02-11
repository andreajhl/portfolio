// import { useEffect } from "react";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { CelebritiesPage } from "react-app/src/components/pages/celebrities";
// import isBrowser from "react-app/src/utils/isBrowser";
// import auth0 from "../lib/auth0";

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
