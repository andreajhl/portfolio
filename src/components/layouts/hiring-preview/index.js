import React, {Component} from 'react';
import "./styles.scss";
import {ShareContractLayout} from "../share-contract";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {Session} from "../../../state/utils/session";
import {ReviewCreatorLayout} from "../review-creator";
import {ContractCommentSectionLayout} from "../contract-comments-section";

class HiringPreviewLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videoDesktopPlayIcon: "fa-play",
            showVideo: false,
        };

        this.session = new Session();
        this.videoDesktopRef = React.createRef();

        this.playDesktopVideo = this.playDesktopVideo.bind(this);
        this.goToCelebrity = this.goToCelebrity.bind(this);
    }

    playDesktopVideo() {
        if (this.videoDesktopRef.current.paused) {
            this.setState({videoDesktopPlayIcon: "fa-pause"}, () => {
                this.videoDesktopRef.current.play()
            });
        } else {
            this.setState({videoDesktopPlayIcon: "fa-play"}, () => {
                this.videoDesktopRef.current.pause()
            });
        }
    }

    goToCelebrity() {
        history._pushRoute(PATHS.CELEBRITY_PROFILE.replace(":celebrity_username", this.props.contract.celebrity.username))
    }

    renderContractDetails() {
        if (this.session.getSession()) {
            return (
                <>
                    {
                        this.session.getSession().client_id === this.props.contract.client
                            ?
                            <div className="to-from">
                                <h5 className="font-weight-bold">
                                    Para:
                                </h5>
                                <h5>{this.props.contract.delivery_to ? this.props.contract.delivery_to : "----"}</h5>
                                <hr/>
                                <h5 className="font-weight-bold">
                                    De:
                                </h5>
                                <h5>{this.props.contract.delivery_from ? this.props.contract.delivery_from : "----"}</h5>
                                <hr/>
                                <h5 className="font-weight-bold">
                                    Instrucciones
                                </h5>
                                <div className="instructions text-justify">
                                    <h5>{this.props.contract.instructions ? this.props.contract.instructions : "----"}</h5>
                                </div>
                                <hr/>
                            </div>
                            : null
                    }
                </>
            )
        }
    }

    renderContractReview() {
        if (this.session.getSession()) {
            return (
                <>
                    {
                        this.session.getSession().client_id === this.props.contract.client
                            ?
                            <div className="reviews">
                                <ReviewCreatorLayout contract={this.props.contract}/>
                            </div>
                            : null
                    }
                </>
            )
        }
    }

    renderContractComments(){
        if (this.session.getSession()) {
            return (
                <>
                    {
                        this.session.getSession().client_id !== this.props.contract.client
                            ?
                            <ContractCommentSectionLayout contract={this.props.contract}/>
                            : null
                    }
                </>
            )
        }else{
            return <ContractCommentSectionLayout contract={this.props.contract}/>
        }
    }

    render() {
        return (
            <div className={"HiringPreviewLayout"}>
                <div className="main-section f-shadow">
                    <div className="row p-0 m-0">
                        <div className="col-sm-12 col-md-7 col-lg-7 video-container p-0 m-0">
                            <div className="f-video">
                                <i className={'fa fa-2x play-pause ' + (this.state.videoDesktopPlayIcon)}
                                   onClick={this.playDesktopVideo.bind(this)}
                                />
                                <video
                                    src={(this.props.contract.media) + "#t=0.5"}
                                    ref={this.videoDesktopRef}
                                    controls={false}
                                    onClick={this.playDesktopVideo.bind(this)}
                                    playsInline={true}
                                    preload="metadata"
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-5 col-lg-5 details-container p-0 m-0">
                            <div className="close-button" onClick={this.goToCelebrity}>
                                <i className="fa fa-times-circle"/>
                            </div>
                            <div className="share-div">
                                <ShareContractLayout  contract={this.props.contract}/>
                            </div>
                            <div className="video-details">
                                <div className="titles">
                                    <div className="wrap-text" onClick={this.goToCelebrity}>
                                        <img className="celebrity-avatar"
                                             src={this.props.contract.celebrity ? this.props.contract.celebrity.avatar : ""}
                                             alt={"avatar"} />
                                        <h3 className="font-weight-bold cursor-pointer">
                                            {this.props.contract.celebrity ? this.props.contract.celebrity.full_name : "----"}
                                        </h3>
                                        <br/>
                                    </div>
                                    {this.renderContractDetails()}
                                </div>
                                {this.renderContractReview()}
                            </div>
                            {this.renderContractComments()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

export {HiringPreviewLayout};
