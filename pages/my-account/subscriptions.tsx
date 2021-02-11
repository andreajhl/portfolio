import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ClientSubscriptions } from "react-app/src/components/pages/client-subscriptions";

const Profile = () => {
  return (
    <>
      <CustomHead description="Las ultimas publicaciones de tus famosos favoritos." />
      <ClientSubscriptions />
    </>
  );
};

export default Profile;
