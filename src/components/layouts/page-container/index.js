import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {CelebrityShape, PaginationShape} from "../../../prop-types";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import {NavbarSectionLayout} from "../navbar-section";


class PageContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {status: 50}
        };

        this.fetchCelebrities = this.fetchCelebrities.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.updateParams = this.updateParams.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount(): void {
        if(this.props.fetchCelebrities && !this.props.celebrities.length) {
            this.fetchCelebrities();
        }
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
        const {params} = this.state;
        params[key] = value;
        if (key === "search") {
            params["page"] = 1;
        }
        this.setState({
            params: params,
        }, () => this.fetchCelebrities());
    }

    render() {
        return (
            <div className="PageContainer">
                {/* NavbarSectionLayout */}
                {this.props.showFooter ? <NavbarSectionLayout onSearchChange={this.onSearchChange}/> : null}
                {/* End NavbarSectionLayout */}

                {this.props.children}

                {/* FooterLayout */}
                {/*{this.props.showFooter ? <FooterLayout/> : null}*/}
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
    showNavbar: true
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
const _PageContainer = connect(mapStateToProps, mapDispatchToProps)(PageContainer);
export {_PageContainer as PageContainer};
