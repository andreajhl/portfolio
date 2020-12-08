import React, { Component, createRef } from "react";
import {
  CelebrityDetailsCardLayout,
  CelebrityPublicContractsSectionLayout,
  CelebrityReviewsSectionLayout,
  /* LoadingOverlay, */
  PageContainer
} from "../../layouts";
import * as PropTypes from "prop-types";
import { CelebrityShape } from "../../../prop-types";
import { connect } from "react-redux";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import "./styles.scss";
import MetaTags from "react-meta-tags";
import * as GTM from "../../../state/utils/gtm";
import { Session } from "../../../state/utils/session";
import { CelebrityDetails } from "../../layouts/celebrity-details";
import { SimilarCelebritiesCardsSectionLayout } from "../../layouts/similar-celebrities-cards-section";
import { SimilarCelebrityContractsSectionLayout } from "../../layouts/similar-celebrity-contracts-section";
import { CelebrityMainVideoSection } from "../../layouts/main-video-section";
import HowToGetAVideoMessageLayout from "../../layouts/how-to-get-a-video-message";
import { NavLink } from "react-router-dom";

class CelebrityProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {}
    };

    this.getCelebrity = this.getCelebrity.bind(this);

    this.scrollDiv = createRef();
  }

  componentDidMount() {
    GTM.tagManagerDataLayer("CELEBRITY_PROFILE_PAGE_VIEW", this.props.match);
    const session = new Session();
    session.isDummy();
  }

  componentWillMount() {
    if (
      this.props.celebrity.username !==
      this.props.match.params.celebrity_username
    ) {
      this.getCelebrity(this.props.match.params.celebrity_username);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextProps.match.params.celebrity_username !==
      this.props.match.params.celebrity_username
    ) {
      this.getCelebrity(nextProps.match.params.celebrity_username);
    }
  }

  getCelebrity(username) {
    this.props.getCelebrity(username, true);
  }

  similarCelebrities() {
    return this.props.similarCelebrities.filter((item) => {
      return item.id !== this.props.celebrity.id;
    });
  }

  render() {
    // console.log(this.props.celebrity);
    return (
      <div className="CelebrityProfilePage">
        {this.props.celebrity.username && (
          <div>
            <MetaTags>
              <title>Famosos.com - {this.props.celebrity.fullName}</title>
              <meta
                name="description"
                content={
                  "Perfil oficial de " +
                  this.props.celebrity.fullName +
                  " en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas."
                }
              />
              <meta
                property="og:title"
                content={"Famosos.com - " + this.props.celebrity.fullName}
              />
              <meta
                property="og:url"
                content={"https://famosos.com/" + this.props.celebrity.username}
              />
            </MetaTags>
          </div>
        )}
        <PageContainer
          applyFetchCelebrities={false}
          showLogin={false}
          applyFetchUserCelebrityLikes
        >
          <div style={{ minHeight: "100vh" }}>
            {this.props.celebrity.username ===
            this.props.match.params.celebrity_username ? (
              <>
                <CelebrityMainVideoSection
                  mainVideoUrl={this.props.celebrity.mainVideo}
                />
                <CelebrityDetails
                  fullName={this.props.celebrity.fullName}
                  username={this.props.celebrity.username}
                  avatar={this.props.celebrity.avatar}
                  countryCode={this.props.celebrity.countryCode}
                  celebrityId={this.props.celebrity.id}
                  categoryTitle={this.props.celebrity.categoryTitle}
                  contractTypes={this.props.celebrity.contractTypes}
                />
                <CelebrityPublicContractsSectionLayout
                  contractTypes={this.props.celebrity.contractTypes}
                  celebrityId={this.props.celebrity.id}
                  username={this.props.celebrity.username}
                />
                <section className="container text-center pt-2 pb-4">
                  <NavLink to="#">
                    <button
                      type="button"
                      className="btn btn-primary similar-celebrities-button"
                      style={{
                        background: "#FFE1F0",
                        borderRadius: "5px",
                        border: "none",
                        padding: "0.75em 1.5em",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#FB177D"
                      }}
                    >
                      Ver famosos similares
                    </button>
                  </NavLink>
                </section>
                {/* <SimilarCelebritiesCardsSectionLayout
                  celebrityUsername={this.props.celebrity.username}
                />
                <SimilarCelebrityContractsSectionLayout
                  celebrityUsername={this.props.celebrity.username}
                /> */}
                <CelebrityReviewsSectionLayout
                  celebrityId={this.props.celebrity.id}
                />
                <HowToGetAVideoMessageLayout />
              </>
            ) : null}
          </div>
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
  socialNetworks:
    state.celebritySocialNetworks.fetchCelebritySocialNetworksReducer.data
      .results,
  similarCelebritiesLoading:
    state.celebrities.fetchSimilarCelebritiesReducer.loading,
  similarCelebrities:
    state.celebrities.fetchSimilarCelebritiesReducer.data.results,
  similarCelebritiesPaginationData:
    state.celebrities.fetchSimilarCelebritiesReducer.data.informationPage
});

// mapStateToProps
const mapDispatchToProps = {
  getCelebrity: celebrityOperations.get
};

const _CelebrityProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityProfilePage);

export { _CelebrityProfilePage as CelebrityProfilePage };
