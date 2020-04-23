import React, {Component} from 'react';
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
        if(this.props.fetchCelebrities) {
            const queryParams = this.props.queryParams;
            queryParams["page"] = 1;
            this.props.updateQueryParams(queryParams);
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
                        showSearch={this.props.showSearch}
                        showNavbarButtons={this.props.showNavbarButtons}
                        showSearchWeb={this.props.showSearchWeb}
                        showLogin={this.props.showLogin}
                        showFiltersSection={this.props.showFiltersSection}
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
PageContainer.propTypes = {};

// Set defaultProps
PageContainer.defaultProps = {
    fetchCelebrities: true,
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
