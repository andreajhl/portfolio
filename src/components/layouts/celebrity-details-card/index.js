import React, {Component} from 'react';
import "./styles.scss";
import {ContractModal} from "../../containers";


class CelebrityDetailsCardLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageLoaded: false,
            showContractModal: false
        };

        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleImageLoaded() {
        this.setState({imageLoaded: true});
    }

    openModal() {
        this.setState({
            showContractModal: true
        })
    }

    closeModal() {
        this.setState({
            showContractModal: false
        })
    }

    render() {
        return (
            <div className="CelebrityDetailsCardLayout">
                <div className="mb-3">
                    <div className="f-container bg-purple">
                        {/*PROFILE LG*/}
                        <div className="d-none d-md-block profile-lg">
                            <div className="row f-section mx-auto">
                                <div className="col-8">
                                    <div className="row f-card mx-auto">
                                        <div className="col-3 f-avatar my-auto">
                                            <div className="rounded-circle f-shadow">
                                                <img className="rounded-circle"
                                                     onLoad={this.handleImageLoaded}
                                                     src={!this.state.imageLoaded ? "/assets/img/avatar-blank.png" : this.props.celebrity.avatar}
                                                     alt="avatar"/>
                                            </div>
                                        </div>
                                        <div className="col-9 details my-auto">
                                            <div className="row p-0 pl-3 pr-3">
                                                <div className="col-8 p-0 m-0 f-names my-auto">
                                                    <h5>{this.props.celebrity.user.full_name}</h5>
                                                </div>
                                                <div className="col-4 p-0 m-0 text-center my-auto">
                                                    <button className="btn btn-secondary btn-sm f-follow-button">Seguir
                                                    </button>
                                                </div>
                                                <div className="col-12 p-0 m-0 text-center pr-0">
                                                    <div
                                                        onClick={this.openModal}
                                                        className="bg-primary f-contract f-rounded hover cursor-pointer">
                                                        Contratar
                                                        a {this.props.celebrity.user.full_name} por {this.props.celebrity.contracts_price} USD
                                                        <i className="ml-2 fa fa-arrow-right"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row mt-2 text-center">
                                                <div className="col-sm-12 col-md-4 col-lg-4 mb-2">
                                                    <h6 className="text-warning">
                                                        <i className="fa fa-star fa-1x mr-2"/>
                                                        <i className="fa fa-star fa-1x mr-2"/>
                                                        <i className="fa fa-star fa-1x mr-2"/>
                                                        <i className="fa fa-star fa-1x mr-2"/>
                                                        <i className="fa fa-star fa-1x mr-2"/>
                                                    </h6>
                                                    <small>1233 Calificaciones</small>
                                                </div>
                                                <div className="col-sm-12 col-md-4 col-lg-4 mb-2">
                                                    <h6>90%</h6>
                                                    <small>Porcentaje de Respuesta</small>
                                                </div>
                                                <div className="col-sm-12 col-md-4 col-lg-4 mb-2">
                                                    <h6>4 a 7 dias</h6>
                                                    <small>Tiempo de respuesta</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-1 text-justify"
                                             style={{height: "100px", overflow: "auto"}}>
                                            <small>
                                                {this.props.celebrity.description}
                                            </small>
                                        </div>
                                        <div className="col-12 text-justify" style={{height: "20px"}}>
                                            {
                                                this.props.socialNetworks.map((i, index) => {
                                                        return (
                                                            <a href={i.social_network.url} target="_blank"
                                                               rel="noopener noreferrer"
                                                               key={index}
                                                               className="text-secondary">
                                                                <small>
                                                                    <i className={"fa-2x mr-4 " + (i.social_network.fa_icon)}/>
                                                                </small>
                                                            </a>
                                                        )
                                                    }
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 f-video">
                                    <iframe className="f-shadow" title={this.props.celebrity.id} width="100%"
                                            height="100%"
                                            src={this.props.celebrity.main_video}>
                                    </iframe>
                                </div>
                            </div>
                        </div>
                        {/*PROFILE SM*/}
                        <div className="d-block d-md-none profile-sm">
                            <div className="row f-section mx-auto">
                                <div className="col-12">
                                    <div className="f-video text-center bg-light">
                                        <iframe className="f-shadow f-rounded" title={this.props.celebrity.id}
                                                width="100%" height="100%"
                                                src={this.props.celebrity.main_video}>
                                        </iframe>
                                        <div className="f-avatar f-shadow">
                                            <img onLoad={this.handleImageLoaded}
                                                 src={!this.state.imageLoaded ? "/assets/img/avatar-blank.png" : this.props.celebrity.avatar}
                                                 alt="avatar"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-7 mt-4 pr-0">
                                    <div className="margin-left-5w">
                                        <small className="title">{this.props.celebrity.user.full_name}</small>
                                    </div>
                                </div>
                                <div className="col-5 mt-3 pl-0 text-right">
                                    <div className="margin-right-5w">
                                        <button className="btn btn-secondary btn-sm f-follow-button">Seguir</button>
                                    </div>
                                </div>
                                <div className="col-5 pr-0">
                                    <div className="margin-left-5w">
                                        <small className="title text-warning">
                                            <i className="fa fa-star fa-1x mr-2"/>
                                            <i className="fa fa-star fa-1x mr-2"/>
                                            <i className="fa fa-star fa-1x mr-2"/>
                                            <i className="fa fa-star fa-1x mr-2"/>
                                            <i className="fa fa-star fa-1x mr-2"/>
                                        </small>
                                        <br/>
                                        <small className="text-muted subtitle">1234 Calificaciones</small>
                                    </div>
                                </div>
                                <div className="col-7 pl-0 text-right">
                                    <div className="margin-right-5w">
                                        <small className="text-muted subtitle">Porcentaje de respuesta: <b>90%</b>
                                        </small>
                                        <br/>
                                        <small className="text-muted subtitle">
                                            Tiempo de respuesta: 3 a 4 dias
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-btn my-auto p-4">
                                <small className="ml-0 float-left">Contratar por 100 USD</small>
                                <i className="fa fa-arrow-right float-right"/>
                            </div>
                        </div>
                        {/*HASHTAGS*/}
                        <div className="f-line w-100 mt-2 mb-4"></div>
                        <div className="row f-section mx-auto">
                            <div className="col-12 text-justify word-break pb-3 ">
                                <h6>{this.props.celebrity.category.title}
                                    <small className="ml-2 mr-1 hashtags">
                                        {
                                            this.props.celebrity.hashtags.map((h, index) => {
                                                return <span key={index} className="mr-3">#{h}</span>
                                            })
                                        }
                                    </small>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <ContractModal celebrity={this.props.celebrity} showModal={this.state.showContractModal} onHide={this.closeModal}/>
            </div>
        );
    };

}

// default props
CelebrityDetailsCardLayout.defaultProps = {
    celebrity: {
        category: {},
        user: {},
        hashtags: []
    },
    socialNetworks: []
};

export {CelebrityDetailsCardLayout};
