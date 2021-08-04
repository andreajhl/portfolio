import React from "react";
import { NavLink } from "react-app/src/components/common/routing";
import { AUTH_SUCCESS, CELEBRITY_SUBSCRIBE } from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import { parseFullName } from "parse-full-name";
import { LessImportantCallToActionButton } from "../less-important-call-to-action-button";
import { useWindow } from "react-app/src/utils/useWindow";
import { useAuth } from "lib/famosos-auth";
import { history } from "react-app/src/routing/History";
import { useRouter } from "next/router";

function SubscribeToThisCelebrityButton({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  fontSize,
  width,
}) {
  const { locale } = useRouter();
  const userAgent = useWindow()?.navigator?.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

  const { loginWithPopup, isAuthenticated, loginWithRedirect } = useAuth();

  const registerSubscribeToThisCelebrityButtonEvent = (eventName) => {
    GTM.tagManagerDataLayer(eventName + "_SUBSCRIBE_TO_THIS_CELEBRITY_BUTTON", {
      path: window.location.pathname,
      widget: "SubscribeToThisCelebrityButton",
      text,
      celebrityFullName,
      celebrityUsername,
    });
  };

  function handlerClickToLogin() {
    registerSubscribeToThisCelebrityButtonEvent("CLICK");
    const postLoginPath = CELEBRITY_SUBSCRIBE.replace(
      ":celebrity_username",
      celebrityUsername
    );
    if (!isAuthenticated) {
      localStorage.setItem("finalRedirect", postLoginPath);
      if (isMobile | isSafari) {
        loginWithRedirect({
          redirectUri: window.location.origin + AUTH_SUCCESS,
          ui_locales: locale,
        });
      } else {
        loginWithPopup({
          ui_locales: locale,
        });
      }
    } else {
      history.push(postLoginPath);
    }
  }

  const parsedFullName = parseFullName(
    celebrityFullName,
    "all",
    true,
    false,
    true
  );

  const fullNameWords = celebrityFullName.split(" ");

  const displayName =
    parsedFullName.first === "Papá"
      ? `${fullNameWords[0]} ${fullNameWords[1]}`
      : parsedFullName.first || parsedFullName.last;

  return (
    <LessImportantCallToActionButton
      fontSize={fontSize}
      width={width}
      className={className}
      onClick={handlerClickToLogin}
    >
      {text}
      {celebrityFullName ? " " + displayName : ""}
    </LessImportantCallToActionButton>
  );
}

export { SubscribeToThisCelebrityButton };
