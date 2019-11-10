import React, {Component} from 'react';
import "./styles.scss";
import {ReviewCreatorLayout} from "../../layouts";
import {ShareContractLayout} from "../share-contract";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class HiringPreviewLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videoDesktopPlayIcon: "fa-play",
            showVideo: false,
        };

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
        history.push(PATHS.CELEBRITY_PROFILE.replace(":celebrity_username", this.props.contract.celebrity.username))
    }

    render() {
        return (
            <div className={"HiringPreviewLayout"}>
                <div className="main-section f-shadow">
                    <div className="row p-0 m-0">
                        <div className="col-sm-12 col-md-6 col-lg-5 video-container p-0 m-0">
                            <div className="f-video">
                                <i className={'fa fa-2x play-pause ' + (this.state.videoDesktopPlayIcon)}
                                   onClick={this.playDesktopVideo.bind(this)}
                                />
                                <video
                                    src={(this.props.contract.media) + "#t=0.5"}
                                    ref={this.videoDesktopRef}
                                    controls={false}
                                    onClick={this.playDesktopVideo.bind(this)}
                                    playsinline={true}
                                    preload="metadata"
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-7 details-container p-0 m-0">
                            <div className="share-div">
                                <ShareContractLayout  contract={this.props.contract}/>
                            </div>
                            <div className="video-details">
                                <div className="titles">
                                    <div className="wrap-text" onClick={this.goToCelebrity}>
                                        <img className="celebrity-avatar"
                                            src={this.props.contract.celebrity ? this.props.contract.celebrity.avatar : ""}
                                             alt={"avatar"} />
                                        <h1 className="font-weight-bold cursor-pointer">
                                            {this.props.contract.celebrity ? this.props.contract.celebrity.full_name : "----"}
                                        </h1>
                                        <br/>
                                    </div>
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
                                <div className="reviews">
                                    <ReviewCreatorLayout contract={this.props.contract}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}

export {HiringPreviewLayout};
