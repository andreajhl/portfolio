import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {CelebrityShape, PaginationShape} from "../../../prop-types";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import {NavbarSectionLayout} from "../navbar-section";
import {FooterLayout} from "../footer";
import "./styles.scss"

class PageContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {status: 50}
        };

        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount() {
        if(this.props.applyFetchCelebrities === true) {
            const queryParams = this.props.queryParams;
            queryParams["currentPage"] = 1;
            this.props.updateQueryParams(queryParams);
        }
    }

    onSearchChange(keywork) {
        const queryParams = this.props.queryParams;
        queryParams["search"] = keywork;
        queryParams["currentPage"] = 1;
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
                        showSearch={this.props.showSearch}
                        showNavbarButtons={this.props.showNavbarButtons}
                        showSearchWeb={this.props.showSearchWeb}
                        showLogin={this.props.showLogin}
                    />
                    : null
                }
                {/* End NavbarSectionLayout */}
                <div className="page-container-children">
                    {this.props.children}
                    <div className="page-container-children-helper"/>
                </div>

                {/* FooterLayout */}
                {this.props.showFooter ? <FooterLayout/> : null}
                {/* End FooterLayout */}

                {/*EmptyImage*/}
                <img src="/assets/img/avatar-blank.png" style={{display: "none"}} alt="None"/>

                {/*<BottomNavbarSectionLayout/>*/}
            </div>
        );
    };

}

// Set propTypes
PageContainer.propTypes = {
    celebrities: PropTypes.arrayOf(CelebrityShape).isRequired,
    applyFetchCelebrities: PropTypes.func.isRequired,
    paginationData: PaginationShape
};

// Set defaultProps
PageContainer.defaultProps = {
    applyFetchCelebrities: true,
    celebrities: [],
    paginationData: {},
    onSearchChange: () => {},
    showFooter: true,
    showNavbar: true,
    showSearch: true,
    showNavbarButtons: true,
    showSearchWeb: true,
    showInputSearchSm: true,
    showLogin: true
};

// mapStateToProps
const mapStateToProps = (state) => ({
    isLoading: state.celebrities.fetchCelebritiesReducer.loading,
    celebrities: state.celebrities.fetchCelebritiesReducer.data.results,
    paginationData: state.celebrities.fetchCelebritiesReducer.data.informationPage,
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
