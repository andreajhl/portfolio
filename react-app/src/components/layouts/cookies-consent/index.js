import React, {Component} from 'react';
import 'react-flags-select/scss/react-flags-select.scss';
import "./styles.scss";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class CookiesConsent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showBanner: !localStorage.getItem("showCookiesConsent")
        }
    }

    goToTerms = () => {
        history._pushRoute(PATHS.POLICIES_PATH)
    };


    hideBanner = () => {
        localStorage.setItem("showCookiesConsent", "false");
        this.setState({
            showBanner: false
        })
    };

    render() {
        if (this.state.showBanner) {
            return (
                <div className="CookiesConsent">
                    <div className={"content"}>
                        <div>
                            En nuestro sitio web utilizamos cookies propias y de terceros para mejorar la experiencia de
                            usuario, rendimiento, análisis y otro fines. Al hacer clic en aceptar o utilizar nuestro
                            sitio, estarás aceptando el uso de estas cookies.
                        </div>
                        <div className={"text-justify mt-2 "}>
                            <div className={"terms float-left"} onClick={this.goToTerms}>
                                Ver las políticas de privacidad
                            </div>
                            <div className="button ml-3 font-weight-bold p-2 float-right" onClick={this.hideBanner}>
                                Aceptar
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div/>
        }
    };

}

// Set defaultProps
CookiesConsent.defaultProps = {};
export {CookiesConsent};
