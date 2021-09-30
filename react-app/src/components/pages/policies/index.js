import React, { Component, useEffect } from "react";
import { PageContainer } from "../../layouts/page-container";
import * as GTM from "../../../state/utils/gtm";
import { injectIntl } from "react-intl";
import { transformUserNavigatorLanguageToISO2Code } from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";
import { IubendaPrivacyPolicyEN } from "desktop-app/components/docs/IubendaPrivacyPolicyEN";
import { IubendaPrivacyPolicyPT } from "desktop-app/components/docs/IubendaPrivacyPolicyPT";
import { IubendaPrivacyPolicyES } from "desktop-app/components/docs/IubendaPrivacyPolicyES";

class PoliciesPage extends Component {
  componentDidMount() {
    GTM.tagManagerDataLayer("POLICIES_PAGE_VIEW", this.props.match);
  }

  render() {
    const { locale } = this.props.intl;
    const userLang = transformUserNavigatorLanguageToISO2Code(locale);
    if (userLang === "en") {
      return (
        <PageContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minHeight: "100vh",
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "20px",
              marginTop: "30px",
            }}
          >
            <IubendaPrivacyPolicyEN />
          </div>
        </PageContainer>
      );
    }

    if (userLang === "pt") {
      return (
        <PageContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minHeight: "100vh",
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "20px",
              marginTop: "30px",
            }}
          >
            <IubendaPrivacyPolicyPT />
          </div>
        </PageContainer>
      );
    }
    return (
      <PageContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "20px",
            marginTop: "30px",
          }}
        >
          <IubendaPrivacyPolicyES />
        </div>
      </PageContainer>
    );
  }
}

const _PoliciesPage = injectIntl(PoliciesPage);

export { _PoliciesPage as PoliciesPage };
