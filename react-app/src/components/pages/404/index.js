import React, {Component} from 'react';
import "./styles.scss";
import {PageContainer} from "../../layouts/page-container";
import MetaTags from "react-meta-tags";
import {history} from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";


class FourZeroFour extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.goToRoot = this.goToRoot.bind(this);
    }

    render() {
        return (
            <>

                <MetaTags>
                    <title>Famosos.com - Página no encontrada</title>
                    <meta name="description"
                          content="Inicia sesión en Famosos.com. Reserva tu video y disfruta de experiencias únicas."/>
                </MetaTags>

                <PageContainer applyFetchCelebrities={false} showFooter={false}>
                    <div className="SignInPage">
                        <div className="section">
                            <div className="auth-container mx-auto text-center">
                                <h3 className="font-weight-bold text-center">Página no encontrada</h3>
                                <br/>
                                <img width="200px"
                                     style={{opacity: "0.2"}}
                                     src="/assets/img/sad-face-in-rounded-square.svg" alt="sad-face"/>
                                <br/>
                                <button className={"btn btn-primary"} onClick={(e) => {
                                    e.preventDefault();
                                    history._pushRoute(
                                        ROUTING_PATHS.HOME_PATH
                                    );
                                }}>Volver a inicio
                                </button>
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </>
        );
    };

}

export {FourZeroFour};

