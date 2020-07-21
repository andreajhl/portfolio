import React, {Component, createRef} from 'react';
import {
    CelebrityDetailsCardLayout,
    CelebrityPublicContractsSectionLayout,
    CelebrityReviewsSectionLayout,
    PageContainer
} from "../../layouts";
import * as PropTypes from "prop-types";
import {CelebrityShape} from "../../../prop-types";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import "./styles.scss"
import MetaTags from 'react-meta-tags';
import {SimilarCelebritiesLayout} from "../../layouts/similar-celebrities";
import * as GTM from "../../../state/utils/gtm";

class CelebrityProfilePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };

        this.getCelebrity = this.getCelebrity.bind(this);

        this.scrollDiv = createRef()
    }

    componentDidMount() {
        GTM.tagManagerDataLayer(
            "CELEBRITY_PROFILE_PAGE_VIEW",
            this.props.match
        );
    }

    componentWillMount() {
        if (this.props.celebrity.username !== this.props.match.params.celebrity_username) {
            this.getCelebrity(this.props.match.params.celebrity_username);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.match.params.celebrity_username !== this.props.match.params.celebrity_username) {
            this.getCelebrity(nextProps.match.params.celebrity_username);
        }
    }

    getCelebrity(username) {
        this.props.getCelebrity(username, true)
    }

    similarCelebrities() {
        return this.props.similarCelebrities.filter((item) => {
            return item.id !== this.props.celebrity.id;
        });
    }

    render() {
        return (
            <div className="CelebrityProfilePage">
                {
                    process.env.NODE_ENV === 'production'
                    &&
                    <div>
                        <MetaTags>
                            <title>Famosos.com - @{this.props.match.params.celebrity_username}</title>
                            <meta name="description"
                                  content={"Experiencias que mejoran relaciones. Reserva ahora un video personalizado de tu famoso favorito."}/>
                            <meta property="og:site_name"
                                  content={"@" + this.props.match.params.celebrity_username + "en famosos.com."}/>
                            <meta property="og:title"
                                  content={"Famosos.com - @" + this.props.match.params.celebrity_username}/>
                            <meta property="og:url"
                                  content={"https://famosos.com/" + this.props.match.params.celebrity_username}/>
                        </MetaTags>
                        <div className="transition-2xx" style={{position: "fixed", top: "-1000px"}}>Famosos Videos
                            Personalizados
                            de {this.props.celebrity.fullName}</div>
                        <div className="transition-2xx" style={{position: "fixed", top: "-1000px"}}>Comprar video
                            de {this.props.match.params.celebrity_username}</div>
                        <div className="transition-2xx" style={{position: "fixed", top: "-1000px"}}>Comprar video
                            de {this.props.celebrity.fullName}</div>
                        <div className="transition-2xx" style={{position: "fixed", top: "-1000px"}}>Saludos
                            de {this.props.match.params.celebrity_username}</div>
                    </div>
                }
                <PageContainer 
                    applyFetchCelebrities={false}
                    showLogin={false}
                >
                    <div style={{minHeight: "100vh"}}>
                        {
                            this.props.celebrity.username === this.props.match.params.celebrity_username ?
                                <>
                                    {/* CelebrityDetailsCardLayout */}
                                    <CelebrityDetailsCardLayout
                                        username={this.props.celebrity.username}
                                        causeUrl={this.props.celebrity.causeUrl}
                                        avatar={this.props.celebrity.avatar}
                                        fullName={this.props.celebrity.fullName}
                                        categoryTitle={this.props.celebrity.categoryTitle}
                                        isDonor={this.props.celebrity.isDonor}
                                        description={this.props.celebrity.description}
                                        causeLogo={this.props.celebrity.causeLogo}
                                        causeName={this.props.celebrity.causeName}
                                        mainVideo={this.props.celebrity.mainVideo}
                                        hashtags={this.props.celebrity.hashtags}
                                        socialNetworks={this.props.socialNetworks}
                                        contractTypes={this.props.celebrity.contractTypes}
                                    />
                                    {/* END CelebrityDetailsCardLayout */}

                                    {/* CelebrityPublicVideosSectionLayout */}
                                    <CelebrityPublicContractsSectionLayout
                                        celebrityId={this.props.celebrity.id}
                                    />
                                    {/* End CelebrityPublicVideosSectionLayout */}

                                    {/* CelebrityReviewsSection */}
                                    <CelebrityReviewsSectionLayout
                                        celebrityId={this.props.celebrity.id}
                                    />
                                    {/* END CelebrityReviewsSection */}

                                    <div className="col-12 d-block d-md-none">
                                        <img width="100%" style={{
                                            borderTop: "solid 5px #e4e4e4",
                                            borderBottom: "solid 5px rgb(198, 195, 195)",
                                            marginBottom: "10px",
                                        }} src="/assets/img/steps_mobile_profile.png"/>
                                    </div>

                                    {/* CelebrityCardsSectionLayout */}
                                    {/*<SimilarCelebritiesLayout*/}
                                    {/*    showLoading={this.props.isLoading && this.props.queryParams.page > 1}*/}
                                    {/*    celebrities={this.props.similarCelebrities}*/}
                                    {/*/>*/}
                                    {/* End CelebrityCardsSectionLayout */}
                                </>
                                : null
                        }
                    </div>
                </PageContainer>
            </div>
        );
    };

}

// Set propTypes
CelebrityProfilePage.propTypes = {
    celebrity: CelebrityShape.isRequired,
    getCelebrity: PropTypes.func.isRequired,
};

// Set defaultProps
CelebrityProfilePage.defaultProps = {
    celebrity: {
        category_data: {},
        user_data: {},
    },
    socialNetworks: [],
    similarCelebrities: [],
};

// mapStateToProps
const mapStateToProps = (state) => ({
    isLoading: state.celebrities.getCelebrityReducer.loading,
    celebrity: state.celebrities.getCelebrityReducer.data,
    socialNetworks: state.celebritySocialNetworks.fetchCelebritySocialNetworksReducer.data.results,
    similarCelebritiesLoading: state.celebrities.fetchSimilarCelebritiesReducer.loading,
    similarCelebrities: state.celebrities.fetchSimilarCelebritiesReducer.data.results,
    similarCelebritiesPaginationData: state.celebrities.fetchSimilarCelebritiesReducer.data.informationPage
});

// mapStateToProps
const mapDispatchToProps = {
    getCelebrity: celebrityOperations.get,
};

// Export Class
const _CelebrityProfilePage = connect(mapStateToProps, mapDispatchToProps)(CelebrityProfilePage);
export {_CelebrityProfilePage as CelebrityProfilePage};
