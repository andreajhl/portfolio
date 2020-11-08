import React from "react";
import MetaTags from "react-meta-tags";
import {
  PageContainer,
  FiltersSectionLayout,
  CelebritiesResultsShimmerCardsLayout,
  CelebritiesResultsLayout
} from "../../layouts";

const pageTitle = "Famosos.com - Todos los Famosos";
const pageDescription =
  "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas.";

const CelebritiesResultsPage = ({ isLoading, celebrities }) => {
  return (
    <div className="CelebritiesResultsPage">
      <MetaTags>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </MetaTags>
      <PageContainer showFooter={false}>
        <FiltersSectionLayout />
        {isLoading ? (
          <CelebritiesResultsShimmerCardsLayout />
        ) : (
          <CelebritiesResultsLayout celebrities={celebrities} />
        )}
      </PageContainer>
    </div>
  );
};

export { CelebritiesResultsPage };
