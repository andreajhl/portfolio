import React, {Component} from 'react';
import "./styles.scss";
import {NavbarSearchLayout} from "../navbar-search";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import * as PropTypes from "prop-types";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import {connect} from "react-redux";
import {Session} from "../../../state/utils/session";
import {NavLink} from "react-router-dom";


class NavbarSectionLayout extends Component {

    constructor(props){
        super(props);

        this.state = {
            showSearch: false
        };

        this.session = new Session();

        this.goToRootPath = this.goToRootPath.bind(this);
        this.goToSignInPath = this.goToSignInPath.bind(this);
        this.goToSignUpPath = this.goToSignUpPath.bind(this);
        this.logout = this.logout.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.goToProfile = this.goToProfile.bind(this);
    }

    goToRootPath() {
        this.props.fetchCelebrities({status: 50});
        history._pushRoute(PATHS.ROOT_PATH)
    }

    goToSignInPath() {
        history._pushRoute(PATHS.SIGN_IN_PATH)
    }

    goToSignUpPath() {
        history._pushRoute(PATHS.SIGN_UP_PATH)
    }

    goToProfile() {
        history._pushRoute(PATHS.CLIENT_HIRINGS)
    }

    logout() {
        this.session.removeSession();
    }

    showSearch() {
        this.setState({
            showSearch: !this.state.showSearch
        }, () => {
            if (this.state.showSearch) {
                const fMainPadding = document.getElementsByClassName('f-main-padding');
                const fContainer = document.getElementsByClassName('f-container');
                if (fMainPadding.length) {
                    fMainPadding[0].className += ' search-sm-active ';
                }
                if (fContainer.length) {
                    fContainer[0].className += ' search-sm-active ';
                }
            } else {
                const fMainPadding = document.getElementsByClassName('f-main-padding');
                const fContainer = document.getElementsByClassName('f-container');
                if (fMainPadding.length) {
                    fMainPadding[0].className = ' f-main-padding ';
                }
                if (fContainer.length) {
                    fContainer[0].className = ' f-container ';
                }
            }
        })
    }

    render() {
        const isLogged = this.session.getSession();
        return (
            <div className="NavbarSectionLayout">
                <div className="f-navbar-container">
                    <nav className="f-navbar">
                        {/* LG*/}
                        <div className="f-items d-none d-md-block">
                            <div className="float-left cursor-pointer" style={{position: "relative", top: "-2.5px"}}>
                                <img className="f-navbar-brand" src={"/assets/img/logo-color.png"} alt="logo"
                                     onClick={this.goToRootPath}
                                />
                            </div>
                            <div className="float-right float-right-lg">
                                {
                                    !isLogged
                                        ?
                                        <>
                                            <button className="btn btn-sm mr-2" onClick={this.goToSignInPath}>
                                                Ingresar
                                            </button>
                                            <button className="btn btn-outline-primary btn-sm f-register-button"
                                                    onClick={this.goToSignUpPath}>
                                                Registrarse
                                            </button>
                                        </>
                                        :
                                        <>
                                            <NavLink className=" btn btn-sm mr-2"
                                                     activeClassName='active'
                                                     to={PATHS.CLIENT_HIRINGS}
                                            >
                                                <i className="mr-1 fa fa-clipboard fa-2x mt-0"/>
                                                <span className="font-weight-bold ml-1">Mis Contrataciones</span>
                                            </NavLink>
                                            <NavLink className=" btn btn-sm mr-2"
                                                     activeClassName='active'
                                                     to={PATHS.CLIENT_PROFILE}
                                            >
                                                <i className="mr-1 fa fa-user fa-2x mt-0"/>
                                                <span className="font-weight-bold ml-1">Mi Perfil</span>
                                            </NavLink>
                                        </>
                                }
                            </div>
                            <div className="float-left ml-4">
                                <NavbarSearchLayout onSearchChange={this.props.onSearchChange}/>
                            </div>
                        </div>

                        {/* SM*/}
                        <div className="f-items d-block d-md-none">
                            <div className="row" style={{position: "relative", top: "-7px"}}>
                                {/* LOGO*/}
                                <div className="col mt-0 pt-0 mr-0 pr-0 mb-0 pb-0">
                                    <img className="mt-1" src={"/assets/img/logo-color.png"}
                                         style={{width: "100%", maxWidth: "150px"}} alt="logo"
                                         onClick={this.goToRootPath}/>
                                </div>
                                <div className="float-right float-right-lg">
                                    {
                                        !isLogged
                                            ?
                                            <>
                                                <div className="col-sm-2 pt-0 ml-0 pl-0 mb-0 pb-0 text-center"
                                                     style={{display: "flex"}}
                                                >
                                                    <a className="btn btn-sm mr-3" onClick={this.showSearch}>
                                                        <i className={"fa fa-search fa-2x" + (this.state.showSearch ? " text-primary " : "")}/>
                                                    </a>
                                                    <button className="btn btn-primary btn-sm mt-2 f-register-button" onClick={this.goToSignUpPath}>
                                                        Comenzar
                                                    </button>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-sm-2 pt-0 ml-0 pl-0 mb-0 pb-0 text-center"
                                                     style={{display: "flex"}}
                                                >
                                                    <a className="btn btn-sm mr-3" onClick={this.showSearch}>
                                                        <i className={"fa fa-search fa-2x" + (this.state.showSearch ? " text-primary " : "")}/>
                                                    </a>
                                                    <NavLink className=" btn btn-sm mr-2"
                                                             activeClassName='active'
                                                             to={PATHS.CLIENT_HIRINGS}
                                                    >
                                                        <i className="mr-1 fa fa-clipboard fa-2x"/>
                                                        <span className="font-weight-bold ml-1"/>
                                                    </NavLink>
                                                    <NavLink className="btn btn-sm mr-2"
                                                             activeClassName='active'
                                                             to={PATHS.CLIENT_PROFILE}
                                                    >
                                                        <i className="mr-1 fa fa-user fa-2x"/>
                                                        <span className="font-weight-bold ml-1"/>
                                                    </NavLink>
                                                </div>
                                            </>
                                    }
                                </div>
                            </div>
                            <div className="mx-auto">
                                {/*<app-navbar-search></app-navbar-search>*/}
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="f-navbar-container-helper"/>
                {
                    this.state.showSearch
                        ?
                        <div className="f-items d-block d-md-none m-2 search-sm">
                            <NavbarSearchLayout onSearchChange={this.props.onSearchChange}/>
                        </div>
                        : null
                }
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
