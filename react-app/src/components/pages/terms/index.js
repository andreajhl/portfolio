import React, { Component } from "react";
import { PageContainer } from "../../layouts/page-container";
import * as GTM from "../../../state/utils/gtm";
import { transformUserNavigatorLanguageToISO2Code } from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";
import { IubendaTermsAndConditionEN } from "desktop-app/components/docs/IubendaTermsAndConditionEN";
import { IubendaTermsAndConditionES } from "desktop-app/components/docs/IubendaTermsAndConditionES";
import { IubendaTermsAndConditionPT } from "desktop-app/components/docs/IubendaTermsAndConditionPT";
import { injectIntl } from "lib/custom-intl";
class TermsPage extends Component {
  componentDidMount() {
    GTM.tagManagerDataLayer("TERMS_PAGE_VIEW", this.props.match);
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
            <IubendaTermsAndConditionEN />
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
            <IubendaTermsAndConditionPT />
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
          <IubendaTermsAndConditionES />
        </div>
      </PageContainer>
    );
  }
}

const _TermsPage = injectIntl(TermsPage);

export { _TermsPage as TermsPage };
