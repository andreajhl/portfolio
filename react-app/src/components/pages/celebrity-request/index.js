import React, { Component } from "react";
import { PageContainer } from "../../layouts/page-container";
import { CelebrityRequestForm } from "../../containers/celebrity-request-form";

import * as GTM from "../../../state/utils/gtm";
import { CelebrityProfitCalculator } from "desktop-app/components/forms/celebrity-profit-calculator";
import { CelebrityProfitCalculatorWithExpand } from "desktop-app/components/forms/celebrity-profit-calculator-with-expand";

class CelebrityRequestPage extends Component {
  componentDidMount() {
    GTM.tagManagerDataLayer("CELEBRITY_REQUEST_PAGE_VIEW", {});
  }

  render() {
    return (
      <div className="CelebrityRequestPage">
        <PageContainer>
          <div className="container-sm w-80 mt-5 mb-5 d-flex flex-wrap  justify-content-lg-between justify-content-md-center justify-content-center">
            <CelebrityRequestForm />
            <CelebrityProfitCalculatorWithExpand />
          </div>
        </PageContainer>
      </div>
    );
  }
}

export { CelebrityRequestPage };
