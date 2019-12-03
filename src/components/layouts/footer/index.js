import React, {Component} from 'react';
import "./styles.scss";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class FooterLayout extends Component {

    constructor(props) {
        super(props);

        this.goToFAQs = this.goToFAQs.bind(this);
        this.goToPolicies = this.goToPolicies.bind(this);
        this.goToTerms = this.goToTerms.bind(this);
        this.goToFamososTwitter = this.goToFamososTwitter.bind(this);
        this.goToFamososFacebook = this.goToFamososFacebook.bind(this);
        this.goToFamososInstagran = this.goToFamososInstagran.bind(this);
        this.goToApply = this.goToApply.bind(this);
    }

    goToFAQs() {
        history._pushRoute(PATHS.FAQS_PATH)
    }

    goToPolicies() {
        history._pushRoute(PATHS.POLICIES_PATH)
    }

    goToTerms() {
        history._pushRoute(PATHS.TERMS_PATH)
    }

    goToFamososTwitter() {
        window.open("https://www.twitter.com/famosos", '_blank').focus();
    }

    goToFamososFacebook() {
        window.open("https://www.facebook.com/famosos", '_blank').focus();
    }

    goToFamososInstagran() {
        window.open("https://www.instagram.com/famosos/", '_blank').focus();
    }

    goToApply(){
        history._pushRoute(PATHS.CELEBRITY_REQUEST)
    }

    render() {
        return (
            <div className="FooterLayout">
                <footer className="footer">
                    <div className="container" style={{maxWidth: "1300px", zoom: "0.9"}}>
                        <div className="row">

                            <div className="col-12 col-md-4 col-lg-4 col-one">
                                <div className="col-image">
                                    <img className="text-dark"
                                         src="/assets/img/famosos-white-logo.svg"
                                         alt="Logo"
                                    />
                                </div>
                                <div className="col-description">
                                    Es una compañía dedicada a crear tecnologías
                                    <br/>
                                    que conecten personalidades con su fan base.
                                </div>
                                <div className="col-copyright">
                                    &copy; 2019 Famosos, Inc. All Rights Reserved.
                                </div>
                            </div>

                            <div className="col-12 col-md-4 col-lg-4 col-two">
                                <div className="col-title">
                                    ¿Tienes más de 50k seguidores en redes?
                                </div>
                                <div className="col-button">
                                    <button className="btn btn-primary" onClick={this.goToApply}>
                                        Aplica como Famoso
                                    </button>
                                </div>
                            </div>


                            <div className="col-12 col-md-4 col-lg-4 col-three">
                                <ul className="list-inline">
                                    <li className="list-inline-item mr-3 font-weight-bold">
                                        Síguenos en Redes
                                    </li>
                                    <li className="list-inline-item mr-3" onClick={this.goToFamososFacebook}>
                                        <img className="cursor-pointer" src="/assets/img/facebook-white.svg" width="30px"/>
                                    </li>
                                    <li className="list-inline-item mr-3" onClick={this.goToFamososInstagran}>
                                        <img className="cursor-pointer" src="/assets/img/instagram-white.svg" width="30px"/>
                                    </li>
                                </ul>
                                <ul className="list-inline">
                                    <li className="list-inline-item mr-2 cursor-pointer font-weight-bold">
                                        <span className="small" onClick={this.goToFAQs}>FAQ's</span>
                                    </li>
                                    <li className="list-inline-item ml-2 mr-2 cursor-pointer font-weight-bold">
                                        <span className="small" onClick={this.goToPolicies}>Privacidad</span>
                                    </li>
                                    <li className="list-inline-item ml-2 cursor-pointer font-weight-bold">
                                        <span className="small" onClick={this.goToTerms}>Términos y Condiciones</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={{fontSize:"10px"}}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </footer>
            </div>
        );
    };

}

export {FooterLayout};
