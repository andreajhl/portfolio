import React, {Component} from 'react';
import {CelebrityCardsSectionLayout, PageContainer, PaginationLayout} from "../../layouts";
import * as PropTypes from "prop-types";
import {CelebrityShape, PaginationShape} from "../../../prop-types";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";


class CelebritiesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };

        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.updateParams = this.updateParams.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.fetchCelebrities = this.fetchCelebrities.bind(this);
    }

    componentWillMount(): void {
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
                <PageContainer>
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
CelebritiesPage.propTypes = {
    celebrities: PropTypes.arrayOf(CelebrityShape).isRequired,
    fetchCelebrities: PropTypes.func.isRequired,
    paginationData: PaginationShape
};

// Set defaultProps
CelebritiesPage.defaultProps = {
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
const _CelebritiesPage = connect(mapStateToProps, mapDispatchToProps)(CelebritiesPage);
export {_CelebritiesPage as CelebritiesPage};
