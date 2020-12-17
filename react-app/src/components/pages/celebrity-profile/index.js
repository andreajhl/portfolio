import React, { Component, createRef } from "react";
import { PageContainer } from "../../layouts";
import * as PropTypes from "prop-types";
import { CelebrityShape } from "../../../prop-types";
import { connect } from "react-redux";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import "./styles.scss";
import MetaTags from "react-meta-tags";
import * as GTM from "../../../state/utils/gtm";
import { Session } from "../../../state/utils/session";
import { NavLink } from "react-router-dom";
import { CelebrityProfileLayoutA } from "../../layouts/celebrity-profile-a";
import { CelebrityProfileLayoutB } from "../../layouts/celebrity-profile-b";
import { getCelebrityProfileVersion } from "../../../utils/celebrityProfileVersion";

const CelebrityProfileLayout = ({ celebrity }) => {
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
              <CelebrityProfileLayout celebrity={this.props.celebrity} />
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
