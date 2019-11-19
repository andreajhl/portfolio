import React, {Component} from 'react';
import "./styles.scss";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import {ContractFavsLayout} from "../contract-favs";

class CelebrityPublicContractCardLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageLoaded: false,
            videoDesktopPlayIcon: "fa-play"
        };

        this.playDesktopContract = this.playDesktopContract.bind(this);
        this.goToContract = this.goToContract.bind(this);

        this.videoDesktopRef = React.createRef();

    }

    playDesktopContract() {
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

    goToContract(){
        history._pushRoute(PATHS.HIRING_PREVIEW.replace(":contract_reference", this.props.publicContract.contract_reference))
    }

    render() {
        return (
            <div className="CelebrityPublicContractCardLayout">
                <div className="card f-card f-rounded hover f-shadow  cursor-pointer">
                    <div className="video">
                        <i className={'fa fa-2x play-pause ' + (this.state.videoDesktopPlayIcon)}
                           onClick={this.playDesktopContract.bind(this)}
                        />
                        <div className="comments">
                            <i className={'fa fa-2x fa-comment'}
                               onClick={this.playDesktopContract.bind(this)}
                            />
                            <small>1</small>
                        </div>
                        <div className="heart">
                            <ContractFavsLayout
                                contractReference={this.props.publicContract.contract_reference}
                            />
                        </div>
                        <video ref={this.videoDesktopRef}
                               controls={false}
                               onClick={this.playDesktopContract.bind(this)}
                               playsInline={true}
                               preload="metadata"
                        >
                            <source src={(this.props.publicContract.media) + "#t=0.5"} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="body pt-3 pb-2" onClick={this.goToContract}>
                        <div className="title">
                            <h6 className="font-weight-bold">Para: {this.props.publicContract.delivery_to}</h6>
                        </div>
                        <div className="icon font-weight-bold">
                            <i className="fa fa-arrow-right text-primary"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

// default props
CelebrityPublicContractCardLayout.defaultProps = {
    publicContract: {}
};

export {CelebrityPublicContractCardLayout};
