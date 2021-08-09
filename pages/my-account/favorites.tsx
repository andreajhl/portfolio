import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ClientFavorites } from "react-app/src/components/pages/client-favorites";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";

const Favorites = () => {
  return (
    <>
      <CustomHead />
      <ClientFavorites />
    </>
  );
};

export default withAuthenticationRequired(Favorites, {
  onRedirecting: () => <LoadingPage></LoadingPage>
});
