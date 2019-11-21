import React, {Component} from 'react';
import "./styles.scss";
import {ContractModal} from "../../containers";
import * as GTM from "../../../state/utils/gtm";


class CelebrityDetailsCardLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageLoaded: false,
            showContractModal: false,
            videoMobilePlayIcon: "fa-play",
            videoDesktopPlayIcon: "fa-play"
        };

        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.playDesktopVideo = this.playDesktopVideo.bind(this);
        this.playMobileVideo = this.playMobileVideo.bind(this);
        this.goToCause = this.goToCause.bind(this);

        this.videoMobileRef = React.createRef();
        this.videoDesktopRef = React.createRef();

    }

    handleImageLoaded() {
        this.setState({imageLoaded: true});
    }

    openModal() {
        GTM.tagManagerDataLayer(
            "CLICK_IN_CONTRACT_BUTTON",
            this.props.celebrity
        );
        this.setState({
            showContractModal: true
        })
    }

    closeModal() {
        this.setState({
            showContractModal: false
        })
    }

    playDesktopVideo() {
        if (this.videoDesktopRef.current.paused) {
            this.setState({videoDesktopPlayIcon: "fa-pause"}, () => {
                this.videoDesktopRef.current.play()
            });
            GTM.tagManagerDataLayer(
                "PLAYING_MAIN_VIDEO",
                this.props.celebrity
            );
        } else {
            this.setState({videoDesktopPlayIcon: "fa-play"}, () => {
                this.videoDesktopRef.current.pause()
            });
            GTM.tagManagerDataLayer(
                "STOPPED_MAIN_VIDEO",
                this.props.celebrity
            );
        }
    }

    playMobileVideo() {
        this.videoMobileRef.current.addEventListener("contextmenu", function (e) { e.preventDefault(); e.stopPropagation(); }, false);
        if (this.videoMobileRef.current.hasAttribute("controls")) {
            this.videoMobileRef.current.removeAttribute("controls")
        }
        this.videoMobileRef.current.classList.add('IIV');
        if (this.videoMobileRef.current.paused) {
            this.setState({videoMobilePlayIcon: "fa-pause"}, () => {
                this.videoMobileRef.current.play()
            });
            GTM.tagManagerDataLayer(
                "PLAYING_MAIN_VIDEO",
                this.props.celebrity
            );
        } else {
            this.setState({videoMobilePlayIcon: "fa-play"}, () => {
                this.videoMobileRef.current.pause()
            });
            GTM.tagManagerDataLayer(
                "STOPPED_MAIN_VIDEO",
                this.props.celebrity
            );
        }
    }

    goToCause() {

    }

    render() {
        return (
            <div className="CelebrityDetailsCardLayout mb-2 pb-2">
                <div className="f-container">
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
                                                <h5 className="text-dark font-weight-bold pt-1 m-0">{this.props.celebrity.full_name}</h5>
                                            </div>
                                            <div className="col-4 p-0 m-0 text-center my-auto">
                                                <button className="btn btn-outline-secondary btn-sm f-follow-button">
                                                    Seguir
                                                </button>
                                            </div>
                                            <div className="col-12 p-0 m-0 text-center pr-0">
                                                <div
                                                    onClick={this.openModal}
                                                    className="bg-primary f-contract f-rounded hover cursor-pointer text-uppercase">
                                                    Contratar
                                                    a {this.props.celebrity.full_name.split(" ")[0]} por ${this.props.celebrity.contracts_price} USD
                                                    <i className="ml-2 fa fa-arrow-right text-white"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row mt-2 text-center">
                                            <div className="col-sm-12 col-md-4 col-lg-4 mb-2">
                                                <h6 className="text-warning">
                                                    <i className="fa fa-star fa-1x mr-2 text-warning"/>
                                                    <i className="fa fa-star fa-1x mr-2 text-warning"/>
                                                    <i className="fa fa-star fa-1x mr-2 text-warning"/>
                                                    <i className="fa fa-star fa-1x mr-2 text-warning"/>
                                                    <i className="fa fa-star fa-1x mr-2 text-warning"/>
                                                </h6>
                                                <small className="text-soft-grey font-weight-bold">
                                                    Calificaciones
                                                </small>
                                            </div>
                                            <div className="col-sm-12 col-md-4 col-lg-4 mb-2">
                                                <h6 className="font-weight-bold">{this.props.celebrity.category}</h6>
                                                <small className="text-soft-grey font-weight-bold">Categoría</small>
                                            </div>
                                            <div className="col-sm-12 col-md-4 col-lg-4 mb-2">
                                                <h6 className="font-weight-bold">1 a 2 dias</h6>
                                                <small className="text-soft-grey font-weight-bold">Tiempo de respuesta
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-1 text-justify description border-bottom">
                                        <small>
                                            {this.props.celebrity.description}
                                        </small>
                                    </div>
                                    {
                                        this.props.celebrity.is_donor
                                            ?
                                            <div className="col-12 mt-1 text-justify">
                                                <div className="foundation" onClick={this.goToCause()}>
                                                    <i className="fas fa-hand-holding-heart"/>
                                                    <img className="bookmark" src="/assets/img/bookmark.svg"
                                                         alt="bookmark"/>
                                                    <div className="celebrity-data">
                                                        <small>
                                                            {this.props.celebrity.full_name} dona
                                                            parte <br/> de sus ingresos a:
                                                        </small>
                                                    </div>
                                                    <div className="cause-name">
                                                        <small className="text-primary font-weight-bold">
                                                            {this.props.celebrity.cause_name}
                                                        </small>
                                                    </div>
                                                    <img className="cause_logo" src={this.props.celebrity.cause_logo}
                                                         alt="cause_logo"/>
                                                    <i className="fas fa-arrow-right text-primary"/>
                                                </div>
                                            </div>
                                            :
                                            null
                                    }
                                    <div className="col-12 text-justify" style={{height: "20px"}}>
                                        {
                                            this.props.socialNetworks
                                                ?
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
                                                : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 f-video" style={{padding: "0px"}}>
                                <i className={'fa fa-2x play-pause ' + (this.state.videoDesktopPlayIcon)}
                                   onClick={this.playDesktopVideo.bind(this)}
                                />
                                <video ref={this.videoDesktopRef}
                                       controls={false}
                                       onClick={this.playDesktopVideo.bind(this)}
                                       playsInline={true}
                                       preload="metadata"
                                >
                                    <source src={(this.props.celebrity.main_video) + "#t=0.5"} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                    {/*PROFILE SM*/}
                    <div className="d-block d-md-none profile-sm">
                        <div className="row f-section mx-auto sm-row">
                            <div className="col-12">
                                <div className="f-video text-center" onClick={this.playMobileVideo.bind(this)}>
                                    <i className={'fa fa-2x play-pause ' + (this.state.videoMobilePlayIcon)}
                                       onClick={this.playMobileVideo.bind(this)}
                                    />
                                    <video
                                           preload="metadata"
                                           style={{
                                               background: "url('" + this.props.celebrity.avatar + "')",
                                               backgroundSize: "cover"
                                           }}
                                           ref={this.videoMobileRef}
                                           width="100%"
                                           height="460px"
                                           controls={false}
                                           playsInline={true}
                                           onClick={this.playMobileVideo.bind(this)}
                                    >
                                        <source src={(this.props.celebrity.main_video) + "#t=0.5"} type="video/mp4"/>
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="f-avatar f-shadow">
                                        <img onLoad={this.handleImageLoaded}
                                             src={!this.state.imageLoaded ? "/assets/img/avatar-blank.png" : this.props.celebrity.avatar}
                                             alt="avatar"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-7 mt-4 pr-0">
                                <div className="margin-left-5w">
                                    <small className="font-weight-bold title">
                                        {this.props.celebrity.full_name}
                                    </small>
                                </div>
                            </div>
                            <div className="col-5 mt-3 pl-0 text-right">
                                <div className="margin-right-5w">
                                    <button className="btn btn-outline-secondary btn-sm f-follow-button">
                                        Seguir
                                    </button>
                                </div>
                            </div>
                            <div className="col-5 pr-0">
                                <div className="margin-left-5w">
                                    <small className="title text-warning">
                                        <i className="fa fa-star fa-1x mr-1 text-warning"/>
                                        <i className="fa fa-star fa-1x mr-1 text-warning"/>
                                        <i className="fa fa-star fa-1x mr-1 text-warning"/>
                                        <i className="fa fa-star fa-1x mr-1 text-warning"/>
                                        <i className="fa fa-star fa-1x mr-1 text-warning"/>
                                    </small>
                                    <br/>
                                    <small className="text-soft-grey font-weight-bold subtitle">Calificaciones</small>
                                </div>
                            </div>
                            <div className="col-7 pl-0 text-right">
                                <div className="margin-right-5w">
                                    <small className="text-soft-grey subtitle">
                                        Categoría: <b>{this.props.celebrity.category}</b>
                                    </small>
                                    <br/>
                                    <small className="text-soft-grey subtitle">
                                        Tiempo de respuesta: <b>1 a 2 dias</b>
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="footer-btn my-auto p-4" onClick={this.openModal}>
                            <small className="ml-0 float-left text-uppercase text-white font-weight-bold">
                                Contratar por ${this.props.celebrity.contracts_price} USD
                            </small>
                            <i className="fa fa-arrow-right float-right text-white" style={{fontSize: "26px"}}/>
                        </div>
                    </div>
                    {/*HASHTAGS*/}
                    <div className="f-line w-100 mt-2 mb-2 text-soft-grey"></div>
                    <div className="row f-section mx-auto">
                        <div className="col-12 text-justify word-break">
                            <h6>
                                <small className="mr-1 hashtags text-soft-grey">
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
                {
                    this.props.celebrity.is_donor
                        ?
                        <div className="d-block d-md-none profile-sm-foundation">
                            <div className="col-12 mt-4 text-justify">
                                <div className="foundation" onClick={this.goToCause()}>
                                    <i className="fas fa-hand-holding-heart"/>
                                    <img className="bookmark" src="/assets/img/bookmark.svg"
                                         alt="bookmark"/>
                                    <div className="celebrity-data">
                                        <small>
                                            {this.props.celebrity.full_name} dona
                                            parte <br/> de sus ingresos a:
                                        </small>
                                    </div>
                                    <div className="cause-name">
                                        <small className="text-primary font-weight-bold">
                                            {this.props.celebrity.cause_name}
                                        </small>
                                    </div>
                                    <img className="cause_logo" src={this.props.celebrity.cause_logo}
                                         alt="cause_logo"/>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
                <ContractModal
                    celebrity={this.props.celebrity}
                    showModal={this.state.showContractModal}
                    onHide={this.closeModal}
                />
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
