import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ClientFavorites } from "react-app/src/components/pages/client-favorites";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoaderLayout } from "react-app/src/components/layouts/loader";

const Favorites = () => {
  return (
    <>
      <CustomHead />
      <ClientFavorites />
    </>
  );
};

export default withAuthenticationRequired(Favorites, {
  onRedirecting: () => <LoaderLayout></LoaderLayout>
});
