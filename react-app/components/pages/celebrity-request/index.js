import React, { Component } from "react";
import { PageContainer } from "../../layouts/page-container";
import { CelebrityRequestForm } from "../../containers/celebrity-request-form";

import * as GTM from "../../../state/utils/gtm";

class CelebrityRequestPage extends Component {
  componentDidMount() {
    GTM.tagManagerDataLayer("CELEBRITY_REQUEST_PAGE_VIEW", {});
  }

  render() {
    return (
      <div className="CelebrityRequestPage">
        <PageContainer>
          <div className="section">
            <CelebrityRequestForm />
          </div>
        </PageContainer>
      </div>
    );
  }
}

export { CelebrityRequestPage };
