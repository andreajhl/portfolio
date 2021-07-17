import { ReactNode } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";
import { GoogleLogin } from "react-google-login";
import { IsMobile } from "react-app/src/utils/isMobile";
import axios from "axios";
import { Session } from "react-app/src/state/utils/session";

type GoogleButtonProps = {
  textButton: string;
  className?: string;
};

const responseType = "code";
const clientId = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_IDENTIFIER;
const redirectURL = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT;
function GoogleButton({ textButton, className }: GoogleButtonProps) {
  const responseGoogle = async (res) => {
    if (res?.tokenId) {
      await axios
        .post("/api/google-sign-in-with-access-token", {
          accessToken: res?.tokenId,
        })
        .then(() => {
          const session = new Session();
          session.initSession();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onAuthenticationFailure = (err) => {
    console.log({ err });
  };

  const redirectToGoogleOAuth = () => {
    const tokenRequestURL = "https://accounts.google.com/o/oauth2/auth";
    const scope =
      "https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email";
    const state = "consent";
    window.location.replace(
      `${tokenRequestURL}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scope}&prompt=${state}`
    );
  };

  if (!IsMobile()) {
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText={textButton}
        onSuccess={responseGoogle}
        onFailure={onAuthenticationFailure}
        accessType="offline"
        responseType="id_token permission"
        cookiePolicy={"single_host_origin"}
        redirectUri={redirectURL}
        uxMode={"popup"}
        render={(renderProps) => (
          <button
            type="button"
            className={classes("btn", styles.GoogleButton, className)}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img src="/assets/img/google-logo.svg" alt="Logo de Google" />
            {textButton}
          </button>
        )}
      />
    );
  }
  return (
    <button
      type="button"
      className={classes("btn", styles.GoogleButton, className)}
      onClick={redirectToGoogleOAuth}
    >
      <img src="/assets/img/google-logo.svg" alt="Logo de Google" />
      {textButton}
    </button>
  );
}

export { GoogleButton };
