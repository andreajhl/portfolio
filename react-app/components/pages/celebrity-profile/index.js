import React, { Component } from "react";
import { PageContainer } from "../../layouts/page-container";
import * as PropTypes from "prop-types";
import { CelebrityShape } from "../../../prop-types";
import { connect } from "react-redux";
import { celebrityOperations } from "../../../state/ducks/celebrities";

import * as GTM from "../../../state/utils/gtm";
import { Session } from "../../../state/utils/session";
import { CelebrityProfileLayoutA } from "../../layouts/celebrity-profile-a";
import { CelebrityProfileLayoutB } from "../../layouts/celebrity-profile-b";
import { CelebrityProfileLayoutC } from "../../layouts/celebrity-profile-c";
import { getCelebrityProfileVersion } from "../../../utils/celebrityProfileVersion";
import { NetworkConnectionErrorLayout } from "../../layouts/network-error-message";
import { LastVideosAvailableBanner } from "../../layouts/last-videos-available-banner";

const CelebrityProfileLayout = ({ celebrity }) => {
  if (!celebrity.showSimilarCelebrities) {
    return <CelebrityProfileLayoutC celebrity={celebrity} />;
  }

  const celebrityProfileVersion = getCelebrityProfileVersion();

  return celebrityProfileVersion && celebrityProfileVersion === "B" ? (
    <CelebrityProfileLayoutB celebrity={celebrity} />
  ) : (
    <CelebrityProfileLayoutA celebrity={celebrity} />
  );
};

class CelebrityProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    GTM.tagManagerDataLayer("CELEBRITY_PROFILE_PAGE_VIEW", {
      ...this.props.match,
      celebrityProfileVersion: getCelebrityProfileVersion()
    });
    const session = new Session();
    session.isDummy();
    // this.getCelebrity(this.props.match.params.celebrity_username);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextProps.match.params.celebrity_username !==
      this.props.match.params.celebrity_username
    ) {
      this.getCelebrity(nextProps.match.params.celebrity_username);
    }
  }

  getCelebrity = (username) => {
    this.props.getCelebrity(username, true);
  };

  similarCelebrities() {
    return this.props.similarCelebrities.filter((item) => {
      return item.id !== this.props.celebrity.id;
    });
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
            <div style={{ minHeight: "100vh" }}>
              {this.props.celebrity.id ? (
                <div>
                  <LastVideosAvailableBanner
                    celebrityUsername={this.props.celebrity?.username}
                    celebrityFullName={this.props.celebrity?.fullName}
                  />
                  <CelebrityProfileLayout celebrity={this.props.celebrity} />
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
  errorData: state.celebrities.getCelebrityReducer.error_data
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
