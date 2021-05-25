import { CelebrityDetails } from "desktop-app/components/celebrity-profile/celebrity-details";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ContractSteps } from "desktop-app/components/celebrity-profile/contract-steps";
import { CelebrityPublicContractsReel } from "desktop-app/components/layouts/celebrity-public-contracts-reel";
import { LastReviewsSection } from "desktop-app/components/layouts/last-reviews-section";
import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { StickyCallToActionTopBar } from "desktop-app/components/celebrity-profile/sticky-call-to-action-top-bar";
import { celebrityType } from "desktop-app/types/celebrityType";
import { connect } from "react-redux";
import { SimilarCelebritiesCardsReel } from "desktop-app/components/celebrity-profile/similar-celebrities-cards-reel";
import { CelebritySimilarVideosReel } from "desktop-app/components/celebrity-profile/celebrity-similar-videos-reel";
import { FanClubAdvertise } from "desktop-app/components/celebrity-profile/fan-club-advertise";
import { CreateContractWizard } from "desktop-app/components/celebrity-profile/create-contract-wizard";

const mapStateToProps = ({ celebrities }) => ({
  publicContracts: celebrities.fetchPublicContractsReducer.data.results,
  isLoadingPublicContracts: celebrities.fetchPublicContractsReducer.loading,
});

type StateProps = ReturnType<typeof mapStateToProps>;

type CelebrityProfilePageProps = {
  celebrity: { status: number } & celebrityType;
} & StateProps;

function CelebrityProfilePage({
  celebrity,
  isLoadingPublicContracts,
  publicContracts,
}: CelebrityProfilePageProps) {
  return (
    <PageContainer>
      <PageHeading showHomeLink />
      <StickyCallToActionTopBar
        appearancePosition={600} // por ser definido correctamente.
        celebrity={celebrity}
        onCTAButtonClick={() => {
          if (typeof window === "undefined") return;
          window.scrollTo({ top: 110, behavior: "smooth" }); // posición de la acción deseada.
        }}
      />
      <div style={{ paddingBottom: "28px", borderBottom: "1px solid #DEDEDE" }}>
        <div className="container d-flex">
          <div style={{ width: "616px", marginRight: "3rem" }}>
            <CelebrityDetails celebrity={celebrity} />
          </div>
          <div>
            <CreateContractWizard celebrity={celebrity} />
            <Maybe it={celebrity.availableForSubscriptions}>
              <FanClubAdvertise celebrity={celebrity} />
            </Maybe>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "28px",
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
                marginTop: "auto",
              }}
            >
              <ContractSteps></ContractSteps>
            </div>
          </Maybe>
        </div>
        <div
          style={{
            marginTop: "35px",
            marginBottom: "37px",
          }}
        >
          <LastReviewsSection showMore={true}></LastReviewsSection>
        </div>

        <div
          style={{
            marginBottom: "36px",
          }}
        >
          <Maybe it={!isLoadingPublicContracts && publicContracts?.length >= 3}>
            <div
              style={{
                flex: "1",
              }}
            >
              <ContractSteps></ContractSteps>
            </div>
          </Maybe>
        </div>
        <Maybe it={celebrity.showSimilarCelebrities}>
          <div className="mb-5">
            <Maybe
              it={publicContracts?.length > 0}
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
