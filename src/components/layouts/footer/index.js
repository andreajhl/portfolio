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
    }

    goToFAQs() {
        window.open("https://support.famosos.com/faqs", '_blank').focus();
    }

    goToSupport() {
        window.open("https://support.famosos.com/contact-us", '_blank').focus();
    }

    goToTerms() {
        window.open("https://support.famosos.com/terms", '_blank').focus();
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

    render() {
        return (
            <div className="FooterLayout">
                <footer className="footer f-shadow">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 h-100 text-left text-lg-left my-auto pb-sm-1 pt-2 pb-lg-3 pt-lg-3">
                                <img className="text-dark pb-2 pb-lg-3" src="/assets/img/dark-famosos-logo.svg"
                                     alt="Logo"/>
                                <p className="text-justify">
                                    Famosos es una compañía dedicada a crear tecnologías que conectan personalidades
                                    con sus fan base.
                                </p>
                                <p className="text-muted small mb-4 mb-lg-0">
                                    © 2019 Famosos, Inc. All Rights Reserved.
                                </p>
                            </div>
                            <div className="col-lg-2 pb-sm-1 pt-2 pb-lg-3 pt-lg-3"/>
                            <div className="col-lg-7 h-100 text-left my-auto pb-sm-1 pt-2 pb-lg-3 pt-lg-3">
                                <p className="mb-3">
                                    ¿Tienes mas de 50k seguidores en redes?
                                    <i className="fa fa-arrow-right ml-2 mr-3"/>
                                    <button className="btn btn-primary">Registrate como Famoso</button>
                                </p>
                                <ul className="list-inline mb-2">
                                    <li className="list-inline-item mr-3">
                                        <p>Siguenos en Redes</p>
                                    </li>
                                    <li className="list-inline-item mr-3" onClick={this.goToFamososFacebook}>
                                        <img className="cursor-pointer" src="/assets/img/facebook.svg" width="30px"/>
                                    </li>
                                    <li className="list-inline-item mr-3" onClick={this.goToFamososInstagran}>
                                        <img className="cursor-pointer" src="/assets/img/instagram.svg" width="30px"/>
                                    </li>
                                    <li className="list-inline-item mr-3"  onClick={this.goToFamososTwitter}>
                                        <img className="cursor-pointer" src="/assets/img/twitter.svg" width="30px"/>
                                    </li>
                                </ul>
                                <ul className="list-inline mb-2">
                                    <li className="list-inline-item mr-2 cursor-pointer font-weight-bold">
                                        <span onClick={this.goToFAQs}>FAQ's</span>
                                    </li>
                                    <li className="list-inline-item ml-2 mr-2 cursor-pointer font-weight-bold">
                                        <span onClick={this.goToSupport}>Soporte</span>
                                    </li>
                                    <li className="list-inline-item ml-2 cursor-pointer font-weight-bold">
                                        <span onClick={this.goToTerms}>Terminos y Condiciones</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    };

}

export {FooterLayout};
