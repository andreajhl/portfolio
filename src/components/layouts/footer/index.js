import React, {Component} from 'react';

class FooterLayout extends Component {

    constructor(props) {
        super(props);

        this.goToFAQs = this.goToFAQs.bind(this);
        this.goToSupport = this.goToSupport.bind(this);
        this.goToTerms = this.goToTerms.bind(this);
        this.goToFamososTwitter = this.goToFamososTwitter.bind(this);
        this.goToFamososFacebook = this.goToFamososFacebook.bind(this);
        this.goToFamososInstagran = this.goToFamososInstagran.bind(this);
        this.goToApply = this.goToApply.bind(this);
    }

    goToFAQs() {
        window.open("https://soporte.famosos.com/faqs", '_blank').focus();
    }

    goToSupport() {
        window.open("https://soporte.famosos.com/contactanos", '_blank').focus();
    }

    goToTerms() {
        window.open("https://soporte.famosos.com/terminos", '_blank').focus();
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
        window.open("https://aplica.famosos.com/", '_blank').focus()
    }

    render() {
        return (
            <div className="FooterLayout">
                <footer className="footer">
                    <div className="container" style={{maxWidth: "1300px", zoom: "0.9"}}>
                        <div className="row">
                            <div className="col-12 mb-4">
                                <img className="text-dark" src="/assets/img/dark-famosos-logo.svg"
                                     alt="Logo"/>
                            </div>
                            <div className="col-lg-4 h-100 text-left">
                                <p className="text-justify">
                                    Famosos es una compañía dedicada a crear tecnologías que conectan personalidades
                                    con sus fan base.
                                </p>
                                <p className="text-muted small mb-lg-0">
                                    © 2019 Famosos, Inc. All Rights Reserved.
                                </p>
                            </div>
                            <div className="col-lg-4 h-100 text-left">
                                <ul className="list-inline">
                                    <li className="list-inline-item mr-3 font-weight-bold">
                                        Siguenos en Redes
                                    </li>
                                    <li className="list-inline-item mr-3" onClick={this.goToFamososFacebook}>
                                        <img className="cursor-pointer" src="/assets/img/facebook.svg" width="30px"/>
                                    </li>
                                    <li className="list-inline-item mr-3" onClick={this.goToFamososInstagran}>
                                        <img className="cursor-pointer" src="/assets/img/instagram.svg" width="30px"/>
                                    </li>
                                </ul>
                                <ul className="list-inline">
                                    <li className="list-inline-item mr-2 cursor-pointer font-weight-bold">
                                        <span className="small" onClick={this.goToFAQs}>FAQ's</span>
                                    </li>
                                    <li className="list-inline-item ml-2 mr-2 cursor-pointer font-weight-bold">
                                        <span className="small" onClick={this.goToSupport}>Soporte</span>
                                    </li>
                                    <li className="list-inline-item ml-2 cursor-pointer font-weight-bold">
                                        <span className="small" onClick={this.goToTerms}>Terminos y Condiciones</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-4 h-100 text-left">
                                <p className="mb-3 font-weight-bold">
                                    ¿Tienes mas de 50k seguidores en redes?
                                    <button className="ml-2 btn btn-primary mb-2" onClick={this.goToApply}>
                                        Aplicate como Famoso
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    };

}

export {FooterLayout};
