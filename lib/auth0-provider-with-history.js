import React from "react";
import { useRouter } from "next/router";

import { Auth0Provider } from "@auth0/auth0-react";
import Auth0UserHandler from "./auth0UserHandler";
const Auth0ProviderWithHistory = ({ children }) => {
  // const history = useHistory();

  const onRedirectCallback = (appState) => {
    // Use the router's history module to replace the url
    const router = useRouter();
    router.push(appState?.returnTo || "/");
  };

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URI}
      onRedirectCallback={onRedirectCallback}
    >
      <Auth0UserHandler>{children}</Auth0UserHandler>
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
