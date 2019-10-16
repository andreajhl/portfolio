import React, {Component} from 'react';
import {CelebrityCardsSectionLayout, PageContainer, PaginationLayout} from "../../layouts";
import * as PropTypes from "prop-types";
import {CelebritiesShape, PaginationShape} from "../../../prop-types";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";


class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };
        this.fetchCelebrities = this.fetchCelebrities.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.updateParams = this.updateParams.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentWillMount(): void {
        this.fetchCelebrities();
    }

    fetchCelebrities() {
        this.props.fetchCelebrities(this.state.params)
    }

    onPaginationChange(page) {
        this.updateParams("page", page);
    }

    onSearchChange(keywork) {
        this.updateParams("search", keywork);
    }

    updateParams(key, value) {
        const {params}= this.state;
        params[key] = value;
        if(key === "search"){
            params["page"] = 1;
        }
        this.setState({
            params: params,
        }, () => this.fetchCelebrities());
    }

    render() {
        return (
            <>
                <PageContainer
                    onSearchChange={this.onSearchChange}
                >
                    {/*/!* MainMenuLayout *!/*/}
                    {/*<MainMenuLayout/>*/}
                    {/*/!* End MainMenuLayout *!/*/}

                    {/* CelebrityCardsSectionLayout */}
                    <CelebrityCardsSectionLayout
                        showShimmerCards={this.props.isLoading}
                        celebrities={this.props.celebrities}
                    />
                    {/* End CelebrityCardsSectionLayout */}

                    {/* PaginationLayout */}
                    <PaginationLayout
                        pagination={this.props.paginationData}
                        onPaginationChange={this.onPaginationChange}
                    />
                    {/* End PaginationLayout */}
                </PageContainer>
            </>
        );
    };

}

// Set propTypes
LandingPage.propTypes = {
    celebrities: PropTypes.arrayOf(CelebritiesShape).isRequired,
    fetchCelebrities: PropTypes.func.isRequired,
    paginationData: PaginationShape
};

// Set defaultProps
LandingPage.defaultProps = {
    celebrities: [],
    paginationData: {}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.celebrities.fetchCelebritiesReducer.loading,
    celebrities: state.celebrities.fetchCelebritiesReducer.data.results,
    paginationData: state.celebrities.fetchCelebritiesReducer.data.pagination_data
});

// mapStateToProps
const mapDispatchToProps = {
    fetchCelebrities: celebrityOperations.list
};

// Export Class
const _LandingPage = connect(mapStateToProps, mapDispatchToProps)(LandingPage);
export {_LandingPage as LandingPage};
