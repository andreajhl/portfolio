import React from "react";
import { withRouter } from "../../common/routing";
import {
  CELEBRITY_PROFILE_CONTRACT,
  AUTH_SUCCESS
} from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import { parseFullName } from "parse-full-name";
import { CallToActionButton } from "../call-to-action-button";
import { useAuth } from "lib/famosos-auth";
import { useWindow } from "../../../utils/useWindow";

const HireThisCelebrityButton = ({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  showCelebrityName,
  fontSize,
  width,
  history
}) => {
  const userAgent = useWindow()?.navigator?.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

  const {
    loginWithPopup,
    isLoading,
    isAuthenticated,
    loginWithRedirect
  } = useAuth();

  const handlerClickToLogin = () => {
    registerHireThisCelebrityButtonEvent("CLICK");
    if (!isAuthenticated) {
      localStorage.setItem(
        "finalRedirect",
        "/" + celebrityUsername + "/contratar"
      );
      if (isMobile | isSafari) {
        loginWithRedirect({
          redirectUri: window.location.origin + AUTH_SUCCESS
        });
      } else {
        loginWithPopup();
      }
    } else {
      history.push(
        CELEBRITY_PROFILE_CONTRACT.replace(
          ":celebrity_username",
          celebrityUsername
        )
      );
    }
  };

  const registerHireThisCelebrityButtonEvent = (eventName) => {
    GTM.tagManagerDataLayer(eventName + "_HIRE_THIS_CELEBRITY_BUTTON", {
      path: window.location.pathname,
      widget: "HireThisCelebrityButton",
      text,
      celebrityFullName,
      celebrityUsername
    });
  };

  const parsedFullName = parseFullName(
    celebrityFullName,
    "all",
    true,
    false,
    true
  );

  const fullNameWords = celebrityFullName.split(" ");

  const displayName =
    parsedFullName.first.length <= 4
      ? fullNameWords.slice(0, 2).join(" ")
      : parsedFullName.first || parsedFullName.last;

  return (
    <CallToActionButton
      onClick={() => handlerClickToLogin()}
      onMouseOver={() => registerHireThisCelebrityButtonEvent("HOVER")}
      fontSize={fontSize}
      width={width}
      className={className}
    >
      {text}
      {celebrityFullName && showCelebrityName ? " " + displayName : ""}
    </CallToActionButton>
  );
};

const _HireThisCelebrityButton = withRouter(HireThisCelebrityButton);

export { _HireThisCelebrityButton as HireThisCelebrityButton };
