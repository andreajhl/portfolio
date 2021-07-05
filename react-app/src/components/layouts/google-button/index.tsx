import { ReactNode } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

type GoogleButtonProps = {
  children?: ReactNode;
  className?: string;
};

function GoogleButton({ children, className }: GoogleButtonProps) {
  const { locale } = useIntl();
  const redirectToGoogleOAuth = () => {
    const tokenRequestURL = "https://accounts.google.com/o/oauth2/auth";
    const responseType = "code";
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_IDENTIFIER;
    const redirectURL = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT;
    const scope =
      "https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email";
    const state = "consent";
    window.location.replace(
      `${tokenRequestURL}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scope}&prompt=${state}&local=${locale}`
    );
  };
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
