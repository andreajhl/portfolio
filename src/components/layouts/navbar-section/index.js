import React, {Component} from 'react';
import "./styles.scss";
import {NavbarSearchLayout} from "../navbar-search";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import * as PropTypes from "prop-types";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import {connect} from "react-redux";


class NavbarSectionLayout extends Component {

    constructor(props){
        super(props);

        this.state = {

        };

        this.goToRootPath = this.goToRootPath.bind(this)
    }

    goToRootPath() {
        this.props.fetchCelebrities({status: 50});
        history.push(PATHS.ROOT_PATH)
    }

    render() {
        return (
            <div className="NavbarSectionLayout">
                <div className="f-navbar-container">
                    <nav className="f-navbar">
                        {/* LG*/}
                        <div className="f-items d-none d-md-block">
                            <div className="float-left">
                                <img className="f-navbar-brand" src={"/assets/img/logo-color.png"} alt="logo"
                                     onClick={this.goToRootPath}
                                />
                            </div>
                            {/*<div className="float-right float-right-lg">*/}
                            {/*    <button className="btn btn-sm mr-2">Ingresar</button>*/}
                            {/*    <button className="btn btn-outline-primary btn-sm f-register-button">*/}
                            {/*        Registrarse*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                            <div className="float-left ml-4">
                                <NavbarSearchLayout onSearchChange={this.props.onSearchChange}/>
                            </div>
                        </div>

                        {/* SM*/}
                        <div className="f-items d-block d-md-none">
                            <div className="row">
                                {/* LOGO*/}
                                <div className="col mt-0 pt-0 mr-0 pr-0 mb-0 pb-0">
                                    <img className="mt-1" src={"/assets/img/logo-color.png"}
                                         style={{width: "100%", maxWidth: "150px"}} alt="logo"
                                         onClick={this.goToRootPath}/>
                                </div>
                                {/* LOGIN*/}
                                {/*<div className="col-sm-2 pt-0 ml-0 pl-0 mb-0 pb-0 text-center">*/}
                                {/*    <button className="btn btn-primary btn-sm mt-2 f-register-button">*/}
                                {/*        Comenzar*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                                {/* LOGGED*/}
                                {/*<div className="col-6 pt-0 ml-0 pl-0 mb-0 pb-0 text-right">*/}
                                {/*    <div className="btn-group">*/}
                                {/*        <button className=" btn f-search-button">*/}
                                {/*            <i className=" fa fa-video-camera"/>*/}
                                {/*        </button>*/}
                                {/*        <button className=" btn f-search-button">*/}
                                {/*            <i className="fa fa-search"/>*/}
                                {/*        </button>*/}
                                {/*        <button type="button" className="btn dropdown-toggle">*/}
                                {/*            <img className="img border border-dark profile-img f-shadow" alt="avatar"/>*/}
                                {/*        </button>*/}
                                {/*        <ul role="menu" aria-labelledby="button-triggers-manual">*/}
                                {/*            <li role="menuitem">*/}
                                {/*                <span className="dropdown-item hover cursor-pointer">*/}
                                {/*                    Cerrar sesión*/}
                                {/*                </span>*/}
                                {/*            </li>*/}
                                {/*        </ul>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            <div className="mx-auto">
                                {/*<app-navbar-search></app-navbar-search>*/}
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="f-navbar-container-helper"/>
            </div>
        );
    };

}


// Set propTypes
NavbarSectionLayout.propTypes = {
    fetchCelebrities: PropTypes.func.isRequired,
};

// Set defaultProps
NavbarSectionLayout.defaultProps = {
    onSearchChange: () => {},
};

// mapStateToProps
const mapStateToProps = (state: any) => ({});

// mapStateToProps
const mapDispatchToProps = {
    fetchCelebrities: celebrityOperations.list
};

// Export Class
const _NavbarSectionLayout = connect(mapStateToProps, mapDispatchToProps)(NavbarSectionLayout);
export {_NavbarSectionLayout as NavbarSectionLayout};
