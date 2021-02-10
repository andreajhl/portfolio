import React, { useEffect } from "react";
import { PageContainer } from "../../layouts/page-container";
import { TrendingVideosSectionLayout } from "../../layouts/trending-videos-section";
import * as GTM from "../../../state/utils/gtm";

const TrendingPage = () => {
  useEffect(() => {
    GTM.tagManagerDataLayer("TRENDING_PAGE_VIEW");
  }, []);

  return (
    <div className={"TrendingPage "}>
      <PageContainer
        showNavbar={true}
        applyFetchCelebrities={false}
        showFooter={false}
      >
        <div className="trending-section">
          <TrendingVideosSectionLayout />
        </div>
      </PageContainer>
    </div>
  );
};

export { TrendingPage };
