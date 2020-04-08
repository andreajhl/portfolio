import React, {Component} from 'react';
import "./styles.scss";
import {ShareContractLayout} from "../share-contract";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {Session} from "../../../state/utils/session";
import {ReviewCreatorLayout} from "../review-creator";
import {ContractCommentSectionLayout} from "../contract-comments-section";
import {ContractFavsLayout} from "../contract-favs";

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
        history._pushRoute(PATHS.CELEBRITY_PROFILE.replace(":celebrity_username", this.props.contract.celebrityData.username))
    }

    renderContractDetails() {
        if (this.session.getSession()) {
            return (
                <>
                    {
                        this.session.getSession().id === this.props.contract.userData.id
                            ?
                            <div className="to-from">
                                <h5 className="font-weight-bold">
                                    Para:
                                </h5>
                                <h5>{this.props.contract.deliveryTo ? this.props.contract.deliveryTo : "----"}</h5>
                                <hr/>
                                <h5 className="font-weight-bold">
                                    De:
                                </h5>
                                <h5>{this.props.contract.deliveryFrom ? this.props.contract.deliveryFrom : "----"}</h5>
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
                        this.session.getSession().id === this.props.contract.userData.id
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
                        this.session.getSession().id !== this.props.contract.userData.id
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
                        <div className="col-sm-12 col-md-5 col-lg-5 details-container p-0 m-0" style={{minHeight: "730px"}}>
                            <div className="video-details">
                                <div className="titles">
                                    <div className="wrap-text">
                                        <div className="fav-icon">
                                            <ContractFavsLayout
                                                contractReference={this.props.contract.reference}
                                                ref={this.contractFav}
                                                showCount={false}
                                            />
                                        </div>
                                        <img className="celebrity-avatar"
                                             src={this.props.contract.celebrityData ? this.props.contract.celebrityData.avatar : ""}
                                             alt={"avatar"}
                                             onClick={this.goToCelebrity}
                                        />
                                        <h3 className="ml-2 font-weight-bold cursor-pointer" onClick={this.goToCelebrity}>
                                            {this.props.contract.celebrityData ? this.props.contract.celebrityData.fullName : "----"}
                                        </h3>
                                        <br/>
                                        <div className="mt-4 mb-4">
                                            <h6 className="font-weight-bold">
                                                Compartir video en:
                                            </h6>
                                            <ShareContractLayout  contract={this.props.contract}/>
                                        </div>
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
