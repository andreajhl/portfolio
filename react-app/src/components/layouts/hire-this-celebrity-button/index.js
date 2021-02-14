import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  CELEBRITY_PROFILE_CONTRACT,
  AUTH_SUCCESS
} from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import { parseFullName } from "parse-full-name";
import { CallToActionButton } from "../call-to-action-button";
import { useAuth0 } from "@auth0/auth0-react";

const HireThisCelebrityButton = ({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  showCelebrityName,
  fontSize,
  width
}) => {
  const history = useHistory();

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const {
    loginWithPopup,
    isLoading,
    isAuthenticated,
    loginWithRedirect
  } = useAuth0();

  const handlerClickToLogin = () => {
    registerHireThisCelebrityButtonEvent("CLICK");
    if (!isAuthenticated) {
      localStorage.setItem(
        "finalRedirect",
        "/" + celebrityUsername + "/contratar"
      );
      if (isMobile) {
        loginWithRedirect({
          redirectUri: window.location.origin + AUTH_SUCCESS
        });
      } else {
        loginWithPopup();
      }
    } else if (isAuthenticated) {
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
    <React.Fragment>
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
      {!isLoading && !isAuthenticated && (
        <div className='d-flex align-items-center justify-content-center py-2 px-2 px-xl-5'>
          <span
            style={{
              fontSize: "12px"
            }}
          >
            *Al hacer click Iniciarás Sesión
          </span>
        </div>
      )}
    </React.Fragment>
  );
};

export { HireThisCelebrityButton };
