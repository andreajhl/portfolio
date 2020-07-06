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
                    <span>
                        Al hacer clic en 'Aceptar' o utilizar nuestro sitio, acepta cookies y tecnologías similares para
                        el rendimiento, análisis y otros fines.
                    </span>
                        <br/>
                        <span className={"terms ml-2"} onClick={this.goToTerms}>
                        Vea nuestra política de privacidad
                    </span>
                        <span className="button ml-3 font-weight-bold p-2" onClick={this.hideBanner}>
                        Aceptar
                    </span>
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
