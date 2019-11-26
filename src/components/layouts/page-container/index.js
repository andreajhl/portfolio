import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {CelebrityShape, PaginationShape} from "../../../prop-types";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import {NavbarSectionLayout} from "../navbar-section";
import {FooterLayout} from "../footer";


class PageContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {status: 50}
        };

        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount(): void {
        if(this.props.fetchCelebrities && !this.props.celebrities.length) {
            this.props.fetchCelebrities(this.props.queryParams)
        }
    }

    onSearchChange(keywork) {
        const queryParams = this.props.queryParams;
        queryParams["search"] = keywork;
        queryParams["page"] = 1;
        this.props.updateQueryParams(queryParams);
    }

    render() {
        return (
            <div className="PageContainer">

                {/* NavbarSectionLayout */}
                {this.props.showNavbar
                    ?
                    <NavbarSectionLayout
                        onSearchChange={this.onSearchChange}
                        showInputSearchSm={this.props.showInputSearchSm}
                    />
                    : null
                }
                {/* End NavbarSectionLayout */}

                {this.props.children}

                {/* FooterLayout */}
                {this.props.showFooter ? <FooterLayout/> : null}
                {/* End FooterLayout */}

                {/*EmptyImage*/}
                <img src="/assets/img/avatar-blank.png" style={{display: "none"}} alt="None"/>
            </div>
        );
    };

}

// Set propTypes
PageContainer.propTypes = {
    celebrities: PropTypes.arrayOf(CelebrityShape).isRequired,
    fetchCelebrities: PropTypes.func.isRequired,
    paginationData: PaginationShape
};

// Set defaultProps
PageContainer.defaultProps = {
    fetchCelebrities: true,
    celebrities: [],
    paginationData: {},
    onSearchChange: () => {},
    showFooter: true,
    showNavbar: true,
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.celebrities.fetchCelebritiesReducer.loading,
    celebrities: state.celebrities.fetchCelebritiesReducer.data.results,
    paginationData: state.celebrities.fetchCelebritiesReducer.data.pagination_data,
    queryParams: state.celebrities.queryParamsReducer,
});

// mapStateToProps
const mapDispatchToProps = {
    fetchCelebrities: celebrityOperations.list,
    updateQueryParams: celebrityOperations.updateQueryParams,
};

// Export Class
const _PageContainer = connect(mapStateToProps, mapDispatchToProps)(PageContainer);
export {_PageContainer as PageContainer};
