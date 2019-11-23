import React, {Component} from 'react';
import "./styles.scss";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import {connect} from "react-redux";


class NavbarSearchLayout extends Component {

    state = {
        keyword: this.props.queryParams.search || ""
    };

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.removeKeywords) {
            this.setState({
                keyword: ""
            });
        }
    }

    inputHandler(e) {
        if (e.target.value && e.target.value.length > 1) {
            if (e.target.value.length % 2 === 0) {
                if (this.props.onSearchChange) {
                    GTM.tagManagerDataLayer(
                        "CELEBRITIES_SEARCH_CHANGED",
                        this.state.keyword
                    );
                    this.props.onSearchChange(e.target.value)
                }
            }
        } else if (e.target.value.length === 0) {
            if (this.props.onSearchChange) {
                GTM.tagManagerDataLayer(
                    "CELEBRITIES_SEARCH_CHANGED",
                    this.state.keyword
                );
                this.props.onSearchChange(e.target.value)
            }
        }
        this.setState({
            keyword: e.target.value
        }, () => {
            history._pushRoute(PATHS.ROOT_PATH)
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            if (this.props.onSearchChange) {
                GTM.tagManagerDataLayer(
                    "CELEBRITIES_SEARCH_CHANGED",
                    this.state.keyword
                );
                this.props.onSearchChange(this.state.keyword)
            }
        }
    }

    handleBlur() {
        if (this.props.onSearchChange) {
            GTM.tagManagerDataLayer(
                "CELEBRITIES_SEARCH_CHANGED",
                this.state.keyword
            );
            this.props.onSearchChange(this.state.keyword)
        }
    }

    goToHome() {
        history._pushRoute(PATHS.ROOT_PATH)
    }

    render() {
        return (
            <div className="NavbarSearchLayout">
                <div className="form-group">
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="text"
                            name="search"
                            value={this.state.keyword}
                            onKeyPress={this.handleKeyPress.bind(this)}
                            // onBlur={this.handleBlur.bind(this)}
                            onChange={this.inputHandler.bind(this)}
                            onClick={this.goToHome}
                            placeholder={this.props.searchLabel}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

// Set defaultProps
NavbarSearchLayout.defaultProps = {
    searchLabel: "Ej: Pibe Valderrama, Comediantes, Músicos",
    onSearchChange: function () {
    }
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    queryParams: state.celebrities.queryParamsReducer,
});

// mapStateToProps
const mapDispatchToProps = {
    updateQueryParams: celebrityOperations.updateQueryParams,
};

// Export Class
const _NavbarSearchLayout = connect(mapStateToProps, mapDispatchToProps)(NavbarSearchLayout);
export {_NavbarSearchLayout as NavbarSearchLayout};
