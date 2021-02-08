import React, { Component } from "react";

import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import { ContractFavsLayout } from "../contract-favs";
import { ContractCommentsLayout } from "../contract-comments";
import { contractOperations } from "../../../state/ducks/contracts";
import { connect } from "react-redux";

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
    this.contractFav = React.createRef();
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (
      this.props.currentVideoPlaying !== null &&
      nextProps.currentVideoPlaying !==
        this.props.publicContract.contract_reference &&
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
          contract_reference: this.props.publicContract.contract_reference
        });
      });
    } else {
      this.setState({ videoDesktopPlayIcon: "fa-play" }, () => {
        this.videoDesktopRef.current.pause();
      });
    }
  }

  goToContract() {
    history._pushRoute(
      PATHS.HIRING_PREVIEW.replace(
        ":contract_reference",
        this.props.publicContract.contract_reference
      )
    );
  }

  returnPoster = (videoURL) => {
    const posterURL = videoURL.includes("watermark")
      ? videoURL.replace(".mp4", ".jpg").replace("watermark", "poster")
      : null;

    if (posterURL) {
      return (
        <video
          ref={this.videoDesktopRef}
          poster={posterURL}
          controls={false}
          onClick={this.goToContract.bind(this)}
          playsInline={true}
          onDoubleClick={(e) => {
            e.preventDefault();
            this.contractFav.current.addOrRemoveFav();
          }}
          preload="metadata"
          src={videoURL + "#t=0.5"}
        />
      );
      return (
        <img
          className="poster"
          width={"100%"}
          onClick={this.goToContract.bind(this)}
          src={posterURL}
          alt={"video-poster"}
        />
      );
    } else {
      return (
        <video
          ref={this.videoDesktopRef}
          controls={false}
          onClick={this.goToContract.bind(this)}
          playsInline={true}
          onDoubleClick={(e) => {
            e.preventDefault();
            this.contractFav.current.addOrRemoveFav();
          }}
          preload="metadata"
          src={videoURL + "#t=0.5"}
        />
      );
    }
  };

  render() {
    return (
      <div className="CelebrityPublicContractCardLayout mr-2 card f-card f-rounded hover cursor-pointer">
        <div className="video">
          {this.returnPoster(this.props.publicContract.contract_media)}
        </div>
        <div className="body px-4 py-3 justify-content-between d-flex">
          {/* <div style={{ display: "flex" }}>
              <ContractFavsLayout
                contractReference={this.props.publicContract.contract_reference}
                ref={this.contractFav}
              />
              <ContractCommentsLayout
                contractReference={this.props.publicContract.contract_reference}
              />
            </div> */}
          <div className="title" onClick={this.goToContract}>
            <h6 className="font-weight-bold text-with-ellipsis">
              Para: {this.props.publicContract.contract_delivery_to}
            </h6>
          </div>
          <i
            className={
              "text-black fa fa-2x play-pause " +
              this.state.videoDesktopPlayIcon
            }
            onClick={this.playDesktopContract.bind(this)}
          />
        </div>
      </div>
    );
  }
}

// Set defaultProps
CelebrityPublicContractCardLayout.defaultProps = {
  publicContract: {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
  currentVideoPlaying: state.contracts.playVideoReducer.contract_reference
});

// mapStateToProps
const mapDispatchToProps = {
  playVideo: contractOperations.playVideo
};

// Export Class
const _CelebrityPublicContractCardLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityPublicContractCardLayout);
export { _CelebrityPublicContractCardLayout as CelebrityPublicContractCardLayout };
