import React, {Component} from 'react';
import "./styles.scss";
import {PageContainer} from "../../layouts/page-container";
import MetaTags from "react-meta-tags";
import {history} from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";


class FourZeroFourCelebrityProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <>
                <PageContainer applyFetchCelebrities={false} showFooter={false}>
                    <div className="SignInPage">
                        <div className="section">
                            <div className="auth-container mx-auto text-center p-4">
                                <h3 className="font-weight-light text-center">
                                    No se encontró un famoso con el usuario
                                    {" "}
                                    <span className={"font-weight-bold"}>
                                        {this.props.match.params.celebrity_username}
                                    </span>
                                </h3>
                                <br/>
                                <img width="200px"
                                     style={{opacity: "0.2"}}
                                     src="/assets/img/sad-face-in-rounded-square.svg" alt="sad-face"/>
                                <br/>
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

export {FourZeroFourCelebrityProfile};

