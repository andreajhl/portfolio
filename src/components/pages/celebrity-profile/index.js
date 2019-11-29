import React, {Component, createRef} from 'react';
import {
    CelebrityCardsSectionLayout,
    CelebrityDetailsCardLayout,
    CelebrityReviewsSectionLayout,
    PageContainer,
    CelebrityPublicContractsSectionLayout
} from "../../layouts";
import * as PropTypes from "prop-types";
import {CelebrityShape} from "../../../prop-types";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";


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
        const list = [];
        this.props.similarCelebrities.map(c => {
            if(c.id !== this.props.celebrity.id) {
                list.push(c)
            }
        });
        return list;
    }

    render() {
        return (
            <>
                <PageContainer fetchCelebrities={false}>
                    <div style={{minHeight: "600px"}}>
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
                                <div style={{width: "calc(100vw - 15px)", height: "350px"}}
                                     ref={this.scrollDiv}>
                                    <CelebrityCardsSectionLayout
                                        title={"Famosos similares"}
                                        showShimmerCards={false}
                                        horizontalScroll={true}
                                        celebrities={this.similarCelebrities()}
                                        minHeight={false}
                                    />
                                </div>
                                {/* End CelebrityCardsSectionLayout */}
                            </>
                            : null
                    }
                    </div>
                </PageContainer>
            </>
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
