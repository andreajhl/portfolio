import React, { Component } from "react";
import { PageContainer } from "../../layouts";

import { TrendingVideosSectionLayout } from "../../layouts/trending-videos-section";
import * as GTM from "../../../state/utils/gtm";
import MetaTags from "react-meta-tags";

class TrendingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    GTM.tagManagerDataLayer("TRENDING_PAGE_VIEW", this.props.match);
  }

  render() {
    return (
      <>
        <div className={"TrendingPage "}>
          <MetaTags>
            <title>Famosos.com - Tendencias</title>
            <meta
              name="description"
              content="Estos son los videos que estan siendo tendencia en Famosos.com. Reserva tu video y disfruta de experiencias únicas."
            />
          </MetaTags>

          <PageContainer
            showNavbar={true}
            applyFetchCelebrities={false}
            showFooter={false}
          >
            {/* CelebrityCardsSectionLayout */}
            <div className="trending-section">
              <TrendingVideosSectionLayout />
            </div>
            {/* End CelebrityCardsSectionLayout */}
          </PageContainer>
        </div>
      </>
    );
  }
}

// Export Class
export { TrendingPage };
