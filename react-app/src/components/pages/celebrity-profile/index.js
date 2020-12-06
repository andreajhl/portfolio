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
import { SimilarCelebrityContractsSectionLayout } from "../../layouts/similar-celebrity-contracts-section";
import { CelebrityMainvVideoSection } from "../../layouts/main-video-section";

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
                <CelebrityMainvVideoSection
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
                <SimilarCelebrityContractsSectionLayout />
                <CelebrityReviewsSectionLayout
                  celebrityId={this.props.celebrity.id}
                />

                <div className="col-12 d-block d-md-none">
                  <img
                    width="100%"
                    style={{
                      borderTop: "solid 5px #e4e4e4",
                      borderBottom: "solid 5px rgb(198, 195, 195)",
                      marginBottom: "10px"
                    }}
                    src="/assets/img/steps_mobile_profile.png"
                  />
                </div>

                {/* CelebrityCardsSectionLayout */}
                {/*<SimilarCelebritiesLayout*/}
                {/*    showLoading={this.props.isLoading && this.props.queryParams.page > 1}*/}
                {/*    celebrities={this.props.similarCelebrities}*/}
                {/*/>*/}
                {/* End CelebrityCardsSectionLayout */}
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

// const _CelebrityProfilePage = () => (
//   <CelebrityProfilePage
//     getCelebrity={() => {}}
//     isLoading={false}
//     celebrity={{
//       avatar:
//         "https://famosos-media.s3.amazonaws.com/pictures-develop/1598451091150929028image.jpeg",
//       categoryId: 11,
//       categoryTitle: "Adultos",
//       causeLogo: "",
//       causeName: "",
//       causeUrl: "",
//       contractTypes: [
//         {
//           allowInFFB: false,
//           contractType: 1,
//           description: "",
//           name: "VideoMessage",
//           options: {},
//           price: 1
//         }
//       ],
//       countryCode: "VEN",
//       countryId: 31,
//       countryName: "Venezuela (Bolivarian Republic of)",
//       description:
//         "Modelo Venezolana. Ha participado en campañas para marcas como BEBE y ha hecho editoriales para Vogue y Harper's Bazaar.",
//       fullName: "Yennifer Restrepo Sanchez",
//       hashtags: ["Modelo", "JBalvin"],
//       id: 69,
//       isDonor: false,
//       mainVideo: "",
//       turnaround: 0,
//       username: "yenniferrestrepo2"
//     }}
//   />
// );

export { _CelebrityProfilePage as CelebrityProfilePage };
