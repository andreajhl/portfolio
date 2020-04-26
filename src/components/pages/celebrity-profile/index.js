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

class CelebrityProfilePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };

        this.getCelebrity = this.getCelebrity.bind(this);

        this.scrollDiv = createRef()
    }

    componentWillMount(): void {
        if (this.props.celebrity.username !== this.props.match.params.celebrity_username) {
            this.getCelebrity(this.props.match.params.celebrity_username);
        }
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.match.params.celebrity_username !== this.props.match.params.celebrity_username) {
            this.getCelebrity(nextProps.match.params.celebrity_username);
        }
    }

    getCelebrity(username) {
        this.props.getCelebrity(username)
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
                            de {this.props.celebrity.full_name}</div>
                        <div className="transition-2xx" style={{position: "fixed", top: "-1000px"}}>Comprar video
                            de {this.props.match.params.celebrity_username}</div>
                        <div className="transition-2xx" style={{position: "fixed", top: "-1000px"}}>Comprar video
                            de {this.props.celebrity.full_name}</div>
                        <div className="transition-2xx" style={{position: "fixed", top: "-1000px"}}>Saludos
                            de {this.props.match.params.celebrity_username}</div>
                    </div>
                }
                <PageContainer showLogin={false}>
                    <div style={{minHeight: "100vh"}}>
                        {
                            this.props.celebrity.username === this.props.match.params.celebrity_username ?
                                <>
                                    {/* CelebrityDetailsCardLayout */}
                                    <CelebrityDetailsCardLayout
                                        celebrity={this.props.celebrity}
                                        socialNetworks={this.props.socialNetworks}/>
                                    {/* END CelebrityDetailsCardLayout */}

                                    {/* CelebrityPublicVideosSectionLayout */}
                                    <CelebrityPublicContractsSectionLayout
                                        celebrity={this.props.celebrity}/>
                                    {/* End CelebrityPublicVideosSectionLayout */}

                                    {/* CelebrityReviewsSection */}
                                    <CelebrityReviewsSectionLayout
                                        celebrity={this.props.celebrity}/>
                                    {/* END CelebrityReviewsSection */}

                                    {/* CelebrityCardsSectionLayout */}
                                    <SimilarCelebritiesLayout
                                        showLoading={this.props.isLoading && this.props.queryParams.page > 1}
                                        celebrities={this.props.similarCelebrities}
                                    />
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
const mapStateToProps = (state: any) => ({
    isLoading: state.celebrities.getCelebrityReducer.loading,
    celebrity: state.celebrities.getCelebrityReducer.data,
    socialNetworks: state.celebritySocialNetworks.fetchCelebritySocialNetworksReducer.data.results,
    similarCelebritiesLoading: state.celebrities.fetchSimilarCelebritiesReducer.loading,
    similarCelebrities: state.celebrities.fetchSimilarCelebritiesReducer.data.results,
    similarCelebritiesPaginationData: state.celebrities.fetchSimilarCelebritiesReducer.data.pagination_data
});

// mapStateToProps
const mapDispatchToProps = {
    getCelebrity: celebrityOperations.get,
};

// Export Class
const _CelebrityProfilePage = connect(mapStateToProps, mapDispatchToProps)(CelebrityProfilePage);
export {_CelebrityProfilePage as CelebrityProfilePage};
