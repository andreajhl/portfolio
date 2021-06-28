import { ReactNode } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type FacebookButtonProps = {
  children?: ReactNode;
  className?: string;
};

function FacebookButton({ children, className }: FacebookButtonProps) {
  const redirectToFacebookOAuth = () => {
    const tokenRequestURL = "https://www.facebook.com/v10.0/dialog/oauth";
    const responseType = "code";
    const clientId = process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_IDENTIFIER;
    const redirectURL = process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_REDIRECT;
    const scope = "public_profile,email";
    const state = "famosos";
    window.location.replace(`${tokenRequestURL}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scope}&state=${state}`);
  };
  return (
    <button
      type="button"
      className={classes("btn", styles.FacebookButton, className)}
      onClick={redirectToFacebookOAuth}
    >
      <img src="/assets/img/facebook-f.svg" alt="Logo de Facebook" />
      {children}
    </button>
  );
}

export { FacebookButton };
