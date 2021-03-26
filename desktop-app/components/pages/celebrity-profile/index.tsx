import { getSearchCategoryPath, getSearchPath } from "constants/paths";
import { CelebrityDetails } from "desktop-app/components/celebrity-profile/celebrity-details";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { Link } from "desktop-app/components/common/routing/link";
import { ContractSteps } from "desktop-app/components/contract-steps";
import { CelebrityPublicContractsReel } from "desktop-app/components/layouts/celebrity-public-contracts-reel";
import { LastReviewsSection } from "desktop-app/components/layouts/last-reviews-section";
import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { StickyCallToActionTopBar } from "desktop-app/components/sticky-call-to-action-top-bar";
import { celebrityType } from "desktop-app/types/celebrityType";
import { connect } from "react-redux";

const mockData = [
  {
    contract_id: 9260,
    contract_review:
      "Oleeee, hermoso. Muchas gracias Enrique, que rápido wow. Éxitos, que Dios te Bendiga.",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  },
  {
    contract_id: 7310,
    contract_review: "Gracias ",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  },
  {
    contract_id: 6955,
    contract_review: "Excelente muchísimas gracias, un abrazo!!",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  },
  {
    contract_id: 5407,
    contract_review:
      " ¡Gracias Enrique! Esta fantástico no se lo va a creer. Significa mucho. Algo tan pequeño para ti puede tener un impacto enorme en otro persona.  ",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  },
  {
    contract_id: 4583,
    contract_review: "Gracias amigooo hermoso regaloo",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  },
  {
    contract_id: 4503,
    contract_review:
      "Excelente mi hermanito  espectacularrr espectacular esssssspectacular.   Fuerte abrazo ",
    contract_stars: 5,
    user_full_name: "Duvan vargas",
    date: "20/dic/2020"
  }
];

const mapStateToProps = ({ celebrities }) => ({
  publicContracts: celebrities.fetchPublicContractsReducer.data.results,
  isLoadingPublicContracts: celebrities.fetchPublicContractsReducer.loading
});

type StateProps = ReturnType<typeof mapStateToProps>;

type CelebrityProfilePageProps = {
  celebrity: celebrityType;
} & StateProps;

function CelebrityProfilePage({
  celebrity,
  isLoadingPublicContracts,
  publicContracts,
  ...props
}: CelebrityProfilePageProps) {
  console.log(publicContracts);
  return (
    <PageContainer>
      <StickyCallToActionTopBar celebrity={celebrity} />
      <PageHeading showHomeLink>
        <Link
          href={getSearchCategoryPath(celebrity.categoryId)}
          className="font-weight-bold"
          style={{
            color: "var(--dark)"
          }}
        >
          {celebrity.categoryTitle}
        </Link>
      </PageHeading>
      <div className="container">
        <div style={{ width: "616px" }}>
          <CelebrityDetails celebrity={celebrity} />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          <CelebrityPublicContractsReel
            celebrityId={celebrity.id}
            username={celebrity.username}
            celebrityFullName={celebrity.fullName}
            celebrityAvatar={celebrity.avatar}
          />
          <Maybe it={!isLoadingPublicContracts && publicContracts?.length < 3}>
            <div
              style={{
                flex: "1"
              }}
            >
              <ContractSteps></ContractSteps>
            </div>
          </Maybe>
        </div>
        <LastReviewsSection showMore={true}></LastReviewsSection>

        <div className="mt-5">
          <Maybe it={!isLoadingPublicContracts && publicContracts?.length >= 3}>
            <div
              style={{
                flex: "1"
              }}
            >
              <ContractSteps></ContractSteps>
            </div>
          </Maybe>
        </div>
      </div>
    </PageContainer>
  );
}
const _CelebrityProfilePage = connect(mapStateToProps)(CelebrityProfilePage);

export { _CelebrityProfilePage as CelebrityProfilePage };
