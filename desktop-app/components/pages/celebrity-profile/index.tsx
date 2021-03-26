import { getSearchCategoryPath, getSearchPath } from "constants/paths";
import { CelebrityDetails } from "desktop-app/components/celebrity-profile/celebrity-details";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { Link } from "desktop-app/components/common/routing/link";
import { ContractSteps } from "desktop-app/components/contract-steps";
import { CelebrityPublicContractsReel } from "desktop-app/components/layouts/celebrity-public-contracts-reel";
import { LastReviewsSection } from "desktop-app/components/layouts/last-reviews-section";
import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { StickyCallToActionTopBar } from "desktop-app/components/celebrity-profile/sticky-call-to-action-top-bar";
import { celebrityType } from "desktop-app/types/celebrityType";
import { connect } from "react-redux";
import { SimilarCelebritiesCardsReel } from "desktop-app/components/celebrity-profile/similar-celebrities-cards-reel";
import { CelebritySimilarVideosReel } from "desktop-app/components/celebrity-profile/celebrity-similar-videos-reel";

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
      <StickyCallToActionTopBar
        appearancePosition={600} // por ser definido correctamente.
        celebrity={celebrity}
      />
      <div style={{ paddingBottom: "28px", borderBottom: "1px solid #DEDEDE" }}>
        <div className="container d-flex">
          <div style={{ width: "616px", marginRight: "3rem" }}>
            <CelebrityDetails celebrity={celebrity} />
          </div>
          <div>
            <div
              style={{
                marginTop: "25px",
                marginBottom: "21px",
                height: "587px",
                width: "461px",
                borderRadius: "20px",
                boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
                padding: "54px 36px"
              }}
            >
              <h3>
                Video personalizado
                <br /> de {celebrity.fullName}
              </h3>
            </div>
            <div
              style={{
                height: 63,
                borderRadius: 7,
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                padding: "12px 36px",
                fontSize: "14px",
                display: "flex"
              }}
            >
              <span>
                Accede a contenido exclusivo <br /> de {celebrity.fullName}.
              </span>
              <button
                type="button"
                className="btn btn-tertiary"
                style={{ fontSize: "14px", marginLeft: "auto" }}
              >
                Unirme al Club de Fans
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
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
                marginTop: "auto"
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
        <Maybe it={celebrity.showSimilarCelebrities}>
          <div className="mb-5">
            <Maybe
              it={publicContracts.length > 0}
              orElse={
                <CelebritySimilarVideosReel
                  celebrityUsername={celebrity.username}
                />
              }
            >
              <SimilarCelebritiesCardsReel
                celebrityUsername={celebrity.username}
              />
            </Maybe>
          </div>
        </Maybe>
      </div>
    </PageContainer>
  );
}
const _CelebrityProfilePage = connect(mapStateToProps)(CelebrityProfilePage);

export { _CelebrityProfilePage as CelebrityProfilePage };
