import { ReactNode } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";
import { useWindow } from "react-app/src/utils/useWindow";
import { IsMobile } from "react-app/src/utils/isMobile";

type GoogleButtonProps = {
  children?: ReactNode;
  className?: string;
};

const responseType = "code";
const clientId = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_IDENTIFIER;
const redirectURL = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT;
function GoogleButton({ children, className }: GoogleButtonProps) {
  const responseGoogle = (response) => {
    console.log({ response });
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
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Ingresar con Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      accessType="offline"
      responseType="permission"
      cookiePolicy={"single_host_origin"}
      redirectUri={redirectURL}
      uxMode={IsMobile() ? "redirect" : "popup"}
      className={classes("btn", styles.GoogleButton, className)}
    />
  );
  return (
    <button
      type="button"
      className={classes("btn", styles.GoogleButton, className)}
      onClick={redirectToGoogleOAuth}
    >
      <img src="/assets/img/google-logo.svg" alt="Logo de Google" />
      {children}
    </button>
  );
}

export { GoogleButton };
