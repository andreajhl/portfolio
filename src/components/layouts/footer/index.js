import React, {Component} from 'react';

class FooterLayout extends Component {

    render() {
        return (
            <div className="FooterLayout">
                <footer className="footer bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 h-100 text-left text-lg-left my-auto">
                                <img className="text-dark" src="assets/img/logo.png" alt="Logo"/>
                                    <p>
                                        Famosos es una compañía dedicada a crear tecnologías que conectan personalidades
                                        con sus fan base.
                                    </p>
                                    <p className="text-muted small mb-4 mb-lg-0">&copy; 2019 - Famosos. All Rights
                                        Reserved.</p>
                            </div>
                            <div className="col-lg-2"/>
                            <div className="col-lg-7 h-100 text-left my-auto mt-sm-4 mt-lg-0">
                                <p className="mb-4">
                                    ¿Tienes mas de 50k seguidores en redes?
                                    <i className="fa fa-arrow-right ml-2 mr-3"/>
                                    <button className="btn btn-primary">Registrate como Famoso</button>
                                </p>
                                <ul className="list-inline mb-2">
                                    <li className="list-inline-item mr-3">
                                        <p>Siguenos en Redes</p>
                                    </li>
                                    <li className="list-inline-item mr-3">
                                        <span>
                                            <i className="fa fa-facebook fa-2x fa-fw"/>
                                        </span>
                                    </li>
                                    <li className="list-inline-item mr-3">
                                        <span>
                                            <i className="fa fa-twitter-square fa-2x fa-fw"/>
                                        </span>
                                    </li>
                                    <li className="list-inline-item">
                                        <span>
                                            <i className="fa fa-instagram fa-2x fa-fw"/>
                                        </span>
                                    </li>
                                    <li className="list-inline-item">
                                        <span>
                                            <i className="fa fa-youtube fa-2x fa-fw"/>
                                        </span>
                                    </li>
                                </ul>
                                <ul className="list-inline mb-2">
                                    <li className="list-inline-item mr-4">
                                        <span>Preguntas</span>
                                    </li>
                                    <li className="list-inline-item ml-2 mr-4">
                                        <span>Soporte</span>
                                    </li>
                                    <li className="list-inline-item ml-2 mr-4">
                                        <span>Terminos y Condiciones</span>
                                    </li>
                                    <li className="list-inline-item ml-2 mr-4">
                                        <span>Prensa</span>
                                    </li>
                                    <li className="list-inline-item ml-2 mr-4">
                                        <span>Nosotros</span>
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
