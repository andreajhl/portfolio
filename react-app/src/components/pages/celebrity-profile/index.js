import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { CelebrityShape } from "../../../prop-types";
import { connect } from "react-redux";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import * as GTM from "../../../state/utils/gtm";
import { Session } from "../../../state/utils/session";
import dynamic from "next/dynamic";

const LastVideosAvailableBanner = dynamic(() =>
  import("../../layouts/last-videos-available-banner").then(
    (mod) => mod.LastVideosAvailableBanner
  )
);
const PageContainer = dynamic(() =>
  import("../../layouts/page-container").then((mod) => mod.PageContainer)
);
const NetworkConnectionErrorLayout = dynamic(() =>
  import("../../layouts/network-error-message").then(
    (mod) => mod.NetworkConnectionErrorLayout
  )
);

const LoadingLayout = () => <div style={{ minHeight: "100vh" }} />;

const profileLayoutsConfig = { loading: LoadingLayout };

const CelebrityProfileLayoutA = dynamic(
  () =>
    import("../../layouts/celebrity-profile-a").then(
      (mod) => mod.CelebrityProfileLayoutA
    ),
  profileLayoutsConfig
);

const CelebrityProfileLayoutB = dynamic(
  () =>
    import("../../layouts/celebrity-profile-b").then(
      (mod) => mod.CelebrityProfileLayoutB
    ),
  profileLayoutsConfig
);

const CelebrityProfileLayoutC = dynamic(
  () =>
    import("../../layouts/celebrity-profile-c").then(
      (mod) => mod.CelebrityProfileLayoutC
    ),
  profileLayoutsConfig
);

const CelebrityProfileLayout = ({ celebrity, celebrityProfileVersion }) => {
  if (!celebrity.showSimilarCelebrities) {
    return <CelebrityProfileLayoutC celebrity={celebrity} />;
  }

  return celebrityProfileVersion && celebrityProfileVersion === "B" ? (
    <CelebrityProfileLayoutB celebrity={celebrity} />
  ) : (
    <CelebrityProfileLayoutA celebrity={celebrity} />
  );
};

class CelebrityProfilePage extends Component {
  componentDidMount() {
    GTM.tagManagerDataLayer("CELEBRITY_PROFILE_PAGE_VIEW", {
      ...this.props.match,
      celebrity: this.props.celebrity,
      celebrityProfileVersion: this.props.celebrityProfileVersion
    });
    const session = new Session();
    session.isDummy();
  }

  componentWillUnmount() {
    this.props.cleanPublicContracts();
  }

  render() {
    const hasNetworkError =
      this.props.errorData?.api_error?.message === "Network Error";

    return (
      <div className="CelebrityProfilePage">
        <PageContainer
          applyFetchCelebrities={false}
          showLogin={false}
          applyFetchUserCelebrityLikes
        >
          {!hasNetworkError ? (
            <div>
              {this.props.celebrity.id ? (
                <div>
                  <LastVideosAvailableBanner
                    celebrityUsername={this.props.celebrity?.username}
                    celebrityFullName={this.props.celebrity?.fullName}
                  />
                  <CelebrityProfileLayout
                    celebrity={this.props.celebrity}
                    celebrityProfileVersion={this.props.celebrityProfileVersion}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <NetworkConnectionErrorLayout
              onTryAgain={() =>
                this.getCelebrity(this.props.match.params.celebrity_username)
              }
            />
          )}
        </PageContainer>
      </div>
    );
  }
}

// Set propTypes
CelebrityProfilePage.propTypes = {
  celebrity: CelebrityShape.isRequired,
  getCelebrity: PropTypes.func.isRequired
};

// Set defaultProps
CelebrityProfilePage.defaultProps = {
  celebrity: {
    category_data: {},
    user_data: {}
  },
  socialNetworks: [],
  similarCelebrities: []
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.celebrities.getCelebrityReducer.loading,
  celebrity: state.celebrities.getCelebrityReducer.data,
  errorData: state.celebrities.getCelebrityReducer.error_data,
  celebrityProfileVersion: state.celebrities.celebrityProfileVersionReducer
});

// mapStateToProps
const mapDispatchToProps = {
  getCelebrity: celebrityOperations.get,
  cleanPublicContracts: celebrityOperations.cleanPublicContracts
};

const _CelebrityProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityProfilePage);

export { _CelebrityProfilePage as CelebrityProfilePage };
