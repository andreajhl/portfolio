import React, { Component } from "react";

import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import { ContractFavsLayout } from "../contract-favs";
import { ContractCommentsLayout } from "../contract-comments";
import { contractOperations } from "../../../state/ducks/contracts";
import { connect } from "react-redux";
import * as GTM from "../../../state/utils/gtm";

class TrendingVideoCardLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLoaded: false,
      videoDesktopPlayIcon: "fa-play"
    };

    this.playDesktopContract = this.playDesktopContract.bind(this);
    this.goToContract = this.goToContract.bind(this);
    this.goToHire = this.goToHire.bind(this);
    this.goToCelebrityProfile = this.goToCelebrityProfile.bind(this);

    this.videoDesktopRef = React.createRef();
    this.contractFav = React.createRef();
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (
      this.props.currentVideoPlaying !== null &&
      nextProps.currentVideoPlaying !== this.props.publicContract.reference &&
      this.state.videoDesktopPlayIcon === "fa-pause"
    ) {
      this.setState({ videoDesktopPlayIcon: "fa-play" }, () => {
        this.videoDesktopRef.current.pause();
      });
    }
  }

  playDesktopContract() {
    if (this.videoDesktopRef.current.paused) {
      this.setState({ videoDesktopPlayIcon: "fa-pause" }, () => {
        this.videoDesktopRef.current.play();
        this.props.playVideo({
          contract_reference: this.props.publicContract.reference
        });
      });
    } else {
      this.setState({ videoDesktopPlayIcon: "fa-play" }, () => {
        this.videoDesktopRef.current.pause();
      });
    }
  }

  handleImageLoaded() {
    this.setState({ imageLoaded: true });
  }

  goToContract() {
    GTM.tagManagerDataLayer(
      "CLICK_ON_TRENDING_VIDEO_CONTRACT_DETAILS_BUTTON",
      this.props.publicContract
    );
    history._pushRoute(
      PATHS.HIRING_PREVIEW.replace(
        ":contract_reference",
        this.props.publicContract.reference
      )
    );
  }

  goToHire() {
    GTM.tagManagerDataLayer(
      "CLICK_ON_TRENDING_VIDEO_HIRE_BUTTON",
      this.props.publicContract
    );
    history._pushRoute(
      PATHS.CELEBRITY_PROFILE_CONTRACT.replace(
        ":celebrity_username",
        this.props.publicContract.celebrityData.username
      )
    );
  }

  goToCelebrityProfile() {
    GTM.tagManagerDataLayer(
      "CLICK_ON_TRENDING_VIDEO_CELEBRITY_DETAILS_BUTTON",
      this.props.publicContract
    );
    history._pushRoute(
      PATHS.CELEBRITY_PROFILE.replace(
        ":celebrity_username",
        this.props.publicContract.celebrityData.username
      )
    );
  }

  render() {
    return (
      <div className="TrendingVideoCardLayout">
        <div className="card f-card f-rounded hover cursor-pointer">
          <div className="celebrity-details">
            <img
              className="avatar"
              src={
                this.props.publicContract.celebrityData
                  ? this.props.publicContract.celebrityData.avatar
                  : ""
              }
              alt={"-"}
              onClick={this.goToCelebrityProfile}
            />
            <h5 className="full-name" onClick={this.goToCelebrityProfile}>
              {this.props.publicContract.celebrityData
                ? this.props.publicContract.celebrityData.fullName
                : "----"}
            </h5>
            <div className="contract-button" onClick={this.goToHire}>
              Contratar
              <img src={"/assets/img/famosos-favicon-white.png"} alt={"fav"} />
            </div>
          </div>
          <div className="video">
            <i
              className={
                "fa fa-2x play-pause " + this.state.videoDesktopPlayIcon
              }
              onClick={this.playDesktopContract.bind(this)}
            />
            <video
              ref={this.videoDesktopRef}
              controls={false}
              onClick={this.playDesktopContract.bind(this)}
              playsInline={true}
              onDoubleClick={(e) => {
                e.preventDefault();
                this.contractFav.current.addOrRemoveFav();
              }}
              preload="metadata"
              src={this.props.publicContract.media + "#t=0.5"}
            />
          </div>
          <div className="body">
            <div className="contract-to">
              <div className="title" onClick={this.goToContract}>
                <h6 className="font-weight-bold text-with-ellipsis">
                  Para: {this.props.publicContract.deliveryTo}
                </h6>
              </div>
            </div>
            <div className="favs-and-comments">
              <ContractFavsLayout
                contractReference={this.props.publicContract.reference}
                ref={this.contractFav}
              />
              <ContractCommentsLayout
                contractReference={this.props.publicContract.reference}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Set defaultProps
TrendingVideoCardLayout.defaultProps = {
  publicContract: {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
  currentVideoPlaying: state.contracts.playVideoReducer.reference
});

// mapStateToProps
const mapDispatchToProps = {
  playVideo: contractOperations.playVideo
};

// Export Class
const _TrendingVideoCardLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingVideoCardLayout);
export { _TrendingVideoCardLayout as TrendingVideoCardLayout };
