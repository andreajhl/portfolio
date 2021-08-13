import classes from "classnames";
import styles from "./styles.module.scss";
import { useIntl } from "react-intl";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { analytics } from "react-app/src/state/utils/gtm";
import { redirectToAfterAuthPath } from "lib/famosos-auth";

const clientId = process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_IDENTIFIER;
const redirectURL = process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_REDIRECT;
type FacebookButtonProps = {
  textButton?: string;
  className?: string;
};

function FacebookButton({ className, textButton }: FacebookButtonProps) {
  const { locale } = useIntl();
  const responseFacebook = async (response) => {
    if (response.accessToken) {
      try {
        await axios
          .post("/api/facebook-sign-in-with-access-token", {
            accessToken: response.accessToken,
          })
          .then(() => {
            analytics.trackUserSignIn({ widget: "FacebookButton" });
            redirectToAfterAuthPath();
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FacebookLogin
      textButton={textButton}
      appId={clientId}
      responseType="code"
      cssClass={classes("btn", styles.FacebookButton, className)}
      fields="name,email,picture"
      language={locale}
      scope="public_profile,email"
      // onClick={componentClicked}
      icon={<img src="/assets/img/facebook-f.svg" alt="Logo de Facebook" />}
      callback={responseFacebook}
      redirectUri={redirectURL}
    />
  );
}

export { FacebookButton };
