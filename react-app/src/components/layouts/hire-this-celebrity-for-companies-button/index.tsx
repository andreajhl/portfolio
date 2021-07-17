import React from "react";
import { withRouter } from "../../common/routing";
import * as GTM from "../../../state/utils/gtm";
import { parseFullName } from "parse-full-name";
import { CallToActionButton } from "../call-to-action-button";

const HireThisCelebrityForCompaniesButton = ({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  showCelebrityName,
  fontSize,
  width,
}) => {
  //   const registerHireThisCelebrityButtonEvent = (eventName) => {
  //     GTM.tagManagerDataLayer(
  //       eventName + "_HIRE_THIS_CELEBRITY_FOR_COMPANIES_BUTTON",
  //       {
  //         path: window.location.pathname,
  //         widget: "HireThisCutton",
  //         text,
  //         celebrityFullName,
  //         celebrityUsername
  //       }
  //     );
  //   };

  return (
    <a href="mailto:experiencias@famosos.com">
      <CallToActionButton
        fontSize={fontSize}
        width={width}
        className={className}
      >
        {text}
      </CallToActionButton>
    </a>
  );
};

const _HireThisCelebrityFoCompaniesButton = withRouter(
  HireThisCelebrityForCompaniesButton
);

export { _HireThisCelebrityFoCompaniesButton as HireThisCelebrityForCompaniesButton };
