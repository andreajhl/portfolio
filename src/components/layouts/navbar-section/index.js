import React, {Component} from 'react';
import "./styles.scss";
import {NavbarSearchLayout} from "../navbar-search";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import {connect} from "react-redux";
import {Session} from "../../../state/utils/session";
import {NavLink} from "react-router-dom";
import {CurrencyDropdownLayout} from "../currency-dropdown";
import * as GTM from "../../../state/utils/gtm";


class NavbarSectionLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showSearch: this.props.showInputSearchSm,
            dropdownOpened: false
        };

        this.session = new Session();

        this.goToRootPath = this.goToRootPath.bind(this);
        this.goToSignInPath = this.goToSignInPath.bind(this);
        this.goToSignUpPath = this.goToSignUpPath.bind(this);
        this.logout = this.logout.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.goToProfile = this.goToProfile.bind(this);
        this.openLanding = this.openLanding.bind(this);

        this.dropdownClick = this.dropdownClick.bind(this);

    }

    componentDidMount() {
        this.setState({
            showSearch: new URLSearchParams(history.location.search).get("showInputSearchSm")
        }, () => this.updateClasses());
        document.getElementsByClassName("page-container-children")[0].addEventListener("click", () => {
            this.dropdownClick(false);
        });
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.updateClasses()
    }

    dropdownClick(status = null) {
        let finalStatus = !this.state.dropdownOpened;
        if (status === false) {
            finalStatus = status;
        }
        this.setState({
            dropdownOpened: finalStatus
        }, () => {
            GTM.tagManagerDataLayer(
                "CLICK_ON_DROPDOWN_MENU",
                {}
            );
            const initialClass = "page-container-children-helper";
            if (this.state.dropdownOpened) {
                document.getElementsByClassName(initialClass)[0].className += " active "
            } else {
                document.getElementsByClassName(initialClass)[0].className = initialClass;
            }
        })
    }

    openLanding() {
        window.location.href = "https://landing.famosos.com"
    }

    goToRootPath() {
        if (window.location.pathname !== "/inicio/") {
            const queryParams = this.props.queryParams;
            queryParams["search"] = "";
            if (this.props.queryParams.search === "") {
                this.props.updateQueryParams(queryParams, true);
            } else {
                this.props.updateQueryParams(queryParams, false);
            }
            history._pushRoute(PATHS.ROOT_PATH)
        }
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
            if (this.state.showSearch === true) {
                history._pushRoute(PATHS.ROOT_PATH + "?showInputSearchSm=true")
            } else {
                history._pushRoute(PATHS.ROOT_PATH)
            }
            this.updateClasses()
        })
    }

    updateClasses() {
        if (this.state.showSearch === true) {
            const fMainPadding = document.getElementsByClassName('f-main-padding');
            const fContainer = document.getElementsByClassName('f-container');
            if (fMainPadding.length) {
                fMainPadding[0].className += ' search-sm-active ';
            }
            if (fContainer.length) {
                fContainer[0].className += ' search-sm-active ';
            }
            document.getElementById("input-search").autofocus = true;
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
    }

    render() {
        let logged = "no";
        if (this.session.getSession()) {
            logged = "si";
            if (this.session.getSession().client_status === 0) {
                logged = "dummy";
            }
        }
        const isDummy = this.session.getSession();

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
                                    logged === "no"
                                        ?
                                        (
                                            <>
                                                {/*<NavLink className=" btn btn-sm mr-2"*/}
                                                {/*         activeClassName='active'*/}
                                                {/*         to={PATHS.TRENDING}*/}
                                                {/*>*/}
                                                {/*    <img width={"30px"} src={"/assets/img/trending.svg"}*/}
                                                {/*         className={"cursor-pointer"}*/}
                                                {/*         style={{position: "relative", top: "-2px"}}*/}
                                                {/*    />*/}
                                                {/*    <span className="font-weight-bold ml-1" style={{position: "relative", top: "3px"}}>Tendencias</span>*/}
                                                {/*</NavLink>*/}
                                                {
                                                    this.props.showLogin
                                                        ?
                                                        (
                                                            <>
                                                                <button
                                                                    className="btn btn-primary mt-1 btn-sm f-register-button mr-2"
                                                                    onClick={this.goToSignUpPath}>
                                                                    Ingresar
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )
                                                }

                                                <div className="div-currency">
                                                    <CurrencyDropdownLayout/>
                                                </div>
                                            </>
                                        )
                                        :
                                        (
                                            <></>
                                        )
                                }

                                {logged === "dummy" ? (
                                        <>
                                            {
                                                this.props.showLogin
                                                    ?
                                                    (
                                                        <>
                                                            <button
                                                                className="btn btn-primary mt-1 btn-sm f-register-button mr-2"
                                                                onClick={this.goToSignUpPath}>
                                                                Ingresar
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )
                                            }
                                            <div className="div-currency">
                                                <CurrencyDropdownLayout/>
                                            </div>
                                        </>
                                    ) :
                                    (
                                        <></>
                                    )
                                }
                                {logged === "si" ? (

                                    <>
                                        {/*<NavLink className=" btn btn-sm mr-2"*/}
                                        {/*         activeClassName='active'*/}
                                        {/*         to={PATHS.TRENDING}*/}
                                        {/*>*/}
                                        {/*    <img width={"30px"} src={"/assets/img/trending.svg"}*/}
                                        {/*         className={"cursor-pointer"}*/}
                                        {/*         style={{position: "relative", top: "-2px"}}*/}
                                        {/*    />*/}
                                        {/*    <span className="font-weight-bold ml-1" style={{position: "relative", top: "3px"}}>Tendencias</span>*/}
                                        {/*</NavLink>*/}
                                        <NavLink className=" btn btn-sm mr-2"
                                                 activeClassName='active'
                                                 to={PATHS.CLIENT_HIRINGS}
                                        >
                                            <i className="mr-1 fa fa-clipboard fa-2x mt-0"/>
                                            <span className="font-weight-bold ml-1">Mis Contrataciones</span>
                                        </NavLink>
                                        <NavLink className=" btn btn-sm mr-3"
                                                 activeClassName='active'
                                                 to={PATHS.CLIENT_PROFILE}
                                        >
                                            <i className="mr-1 fa fa-user fa-2x mt-0"/>
                                            <span className="font-weight-bold ml-1">Mi Perfil</span>
                                        </NavLink>
                                        <div className="div-currency">
                                            <CurrencyDropdownLayout/>
                                        </div>
                                    </>
                                ) : (<></>)
                                }
                            </div>
                            {this.props.showSearchWeb ?
                                (
                                    <>
                                        <div className="float-left ml-4">
                                            <NavbarSearchLayout onSearchChange={this.props.onSearchChange}/>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                            }
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
                                <div className="float-right float-right-sm">
                                    {
                                        logged === "no" || logged === "dummy"
                                            ?
                                            <>
                                                <div className="col-sm-2 pt-0 ml-0 pl-0 mb-0 pb-0 text-center"
                                                     style={{display: "flex"}}
                                                >
                                                    <a className="btn btn-sm mr-3" onClick={this.showSearch}>
                                                        <i className={"fa fa-search fa-2x" + (this.state.showSearch ? " text-primary " : "")}/>
                                                    </a>
                                                    <div className="div-currency mr-2">
                                                        <CurrencyDropdownLayout/>
                                                    </div>
                                                    <div className="dropdown">
                                                        <button className="btn btn-outline-dark dropdown-toggle"
                                                                type="button" id="dropdownMenuButton"
                                                                data-toggle="dropdown" aria-haspopup="true"
                                                                aria-expanded="false"
                                                                onClick={this.dropdownClick}
                                                        >
                                                            <i className="fa fa-bars"/>
                                                        </button>
                                                        <div className="dropdown-menu dropdown-menu-right"
                                                             aria-labelledby="dropdownMenuButton"
                                                             style={this.state.dropdownOpened ? {display: "block"} : {}}
                                                        >
                                                            <a className="dropdown-item"
                                                               href="#"
                                                               onClick={this.openLanding}
                                                            >
                                                                ¿Cómo funciona?
                                                            </a>
                                                            <NavLink className="dropdown-item"
                                                                     activeClassName='active'
                                                                     to={PATHS.TRENDING}
                                                            >
                                                                Tendencias
                                                            </NavLink>
                                                            <NavLink className="dropdown-item"
                                                                     activeClassName='active'
                                                                     to={PATHS.SIGN_IN_PATH}
                                                            >
                                                                Iniciar sesión
                                                            </NavLink>
                                                            <NavLink className="dropdown-item"
                                                                     activeClassName='active'
                                                                     to={PATHS.SIGN_UP_PATH}
                                                            >
                                                                Registrarme
                                                            </NavLink>
                                                            <NavLink className="dropdown-item"
                                                                     activeClassName='active'
                                                                     to={PATHS.CELEBRITY_REQUEST}
                                                            >
                                                                Aplicar
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            : <></>
                                    }
                                    {
                                        logged === "si"
                                            ?
                                            <>
                                                <div
                                                    className="col-sm-2 pt-0 ml-0 pl-0 mb-0 pb-0 text-center div-buttons-sm">
                                                    <a className="btn btn-sm mr-3" onClick={this.showSearch}>
                                                        <i className={"fa fa-search fa-2x" + (this.state.showSearch ? " text-primary " : "")}/>
                                                    </a>
                                                    <div className="div-currency mr-2">
                                                        <CurrencyDropdownLayout/>
                                                    </div>
                                                    <div className="dropdown">
                                                        <button className="btn btn-outline-dark dropdown-toggle"
                                                                type="button" id="dropdownMenuButton"
                                                                data-toggle="dropdown" aria-haspopup="true"
                                                                aria-expanded="false"
                                                                onClick={this.dropdownClick}
                                                        >
                                                            <i className="fa fa-bars"/>
                                                        </button>
                                                        <div className="dropdown-menu dropdown-menu-right"
                                                             aria-labelledby="dropdownMenuButton"
                                                             style={this.state.dropdownOpened ? {display: "block"} : {}}
                                                        >
                                                            <NavLink className="dropdown-item"
                                                                     activeClassName='active'
                                                                     to={PATHS.CLIENT_HIRINGS}
                                                            >
                                                                Mis contrataciones
                                                            </NavLink>
                                                            <NavLink className="dropdown-item"
                                                                     activeClassName='active'
                                                                     to={PATHS.CLIENT_PROFILE}
                                                            >
                                                                Mi perfil
                                                            </NavLink>
                                                            <a className="dropdown-item"
                                                               href="#"
                                                               onClick={this.openLanding}
                                                            >
                                                                ¿Cómo funciona?
                                                            </a>
                                                            <NavLink className="dropdown-item"
                                                                     activeClassName='active'
                                                                     to={PATHS.TRENDING}
                                                            >
                                                                Tendencias
                                                            </NavLink>
                                                            <NavLink className="dropdown-item"
                                                                     activeClassName='active'
                                                                     to={PATHS.CELEBRITY_REQUEST}
                                                            >
                                                                Aplicar
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="f-navbar-container-helper"/>
                {
                    this.state.showSearch
                        ?
                        <div className="f-items d-block d-md-none m-2 search-sm">
                            <NavbarSearchLayout
                                onSearchChange={this.props.onSearchChange}
                                autoFocus={this.state.showSearch}/>
                        </div>
                        : null
                }
            </div>
        );
    };

}


// Set propTypes
NavbarSectionLayout.propTypes = {};

// Set defaultProps
NavbarSectionLayout.defaultProps = {
    onSearchChange: () => {
    },
};

// mapStateToProps
const mapStateToProps = (state) => ({
    queryParams: state.celebrities.queryParamsReducer,
    celebrities: state.celebrities.fetchCelebritiesReducer.data.results,
});

// mapStateToProps
const mapDispatchToProps = {
    updateQueryParams: celebrityOperations.updateQueryParams,
};

// Export Class
const _NavbarSectionLayout = connect(mapStateToProps, mapDispatchToProps)(NavbarSectionLayout);
export {_NavbarSectionLayout as NavbarSectionLayout};
