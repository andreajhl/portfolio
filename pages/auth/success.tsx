import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { AuthSuccess } from "../../react-app/src/components/pages/auth-success";
import { GetServerSideProps } from "next";
import { wrapper } from "../../react-app/src/state/store";
import { parse } from "cookie";

const ServerSidePropsCallBack = async ({ req, store, query }) => {
  const cookies = parse(req?.headers?.cookie || "");
  let sessionToken = "";
  sessionToken = cookies[process.env.NEXT_PUBLIC_FAMOSOS_AUTH_SESSION_NAME];
  return {
    props: {
      sessionToken: sessionToken,
    }
  };
};

const Success = ({ sessionToken }) => {
  return (
    <>
      <CustomHead />
      <AuthSuccess />
    </>
  );
};

export default Success;
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(ServerSidePropsCallBack);

