import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { AuthSuccess } from "../../react-app/src/components/pages/auth-success";
import { GetServerSideProps } from "next";
import { wrapper } from "../../react-app/src/state/store";
import { parse } from "cookie";

const ServerSidePropsCallBack = async ({ req, store, query }) => {
  const cookies = parse(req?.headers?.cookie || "");
  let sessionToken = "";
  let redirectTo = "/";

  sessionToken = cookies[process.env.NEXT_PUBLIC_FAMOSOS_AUTH_SESSION_NAME];
  // TODO: validate redirect

  return {
    props: {
      sessionToken: sessionToken,
      redirectTo: redirectTo
    }
  };
};

const Success = ({ sessionToken, redirectTo }) => {
  return (
    <>
      <CustomHead />
      <AuthSuccess redirectTo={redirectTo} />
    </>
  );
};

export default Success;
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(ServerSidePropsCallBack);

