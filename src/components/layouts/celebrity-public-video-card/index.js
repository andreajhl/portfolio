import React, {Component} from 'react';
import "./styles.scss";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";


class CelebrityPublicVideoCardLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageLoaded: false,
            videoDesktopPlayIcon: "fa-play"
        };

        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.goToCelebrityProfile = this.goToCelebrityProfile.bind(this);
        this.playDesktopVideo = this.playDesktopVideo.bind(this);

        this.videoDesktopRef = React.createRef();

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


    handleImageLoaded() {
        this.setState({imageLoaded: true});
    }

    goToCelebrityProfile() {
        history._pushRoute(PATHS.CELEBRITY_PROFILE.replace(":celebrity_username", this.props.celebrity.user.username))
    }

    render() {
        return (
            <div className="CelebrityPublicVideoCardLayout">
                <div className="card f-card f-rounded hover f-shadow  cursor-pointer">
                    <div className="video">
                        <i className={'fa fa-2x play-pause ' + (this.state.videoDesktopPlayIcon)}
                           onClick={this.playDesktopVideo.bind(this)}
                        />
                        <div className="comments">
                            <i className={'fa fa-2x fa-comment'}
                               onClick={this.playDesktopVideo.bind(this)}
                            />
                            <small>1</small>
                        </div>
                        <div className="heart">
                            <i className={'fa fa-2x fa-heart'}
                               onClick={this.playDesktopVideo.bind(this)}
                            />
                            <small>10</small>
                        </div>
                        <video ref={this.videoDesktopRef}
                               controls={false}
                               onClick={this.playDesktopVideo.bind(this)}
                               playsinline={true}
                        >
                            <source src={this.props.publicVideo.media} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="title p-2 pt-3">
                        <h6 className="font-weight-bold">
                            Para: {this.props.publicVideo.delivery_to}
                        </h6>
                    </div>
                </div>
            </div>
        );
    };
}

// default props
CelebrityPublicVideoCardLayout.defaultProps = {
    publicVideo: {}
};

export {CelebrityPublicVideoCardLayout};
