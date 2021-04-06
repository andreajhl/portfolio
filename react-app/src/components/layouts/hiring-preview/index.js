import React, { Component } from "react";

import { ShareContractLayout } from "../share-contract";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import { Session } from "../../../state/utils/session";
import { ContractFavsLayout } from "../contract-favs";
import { ReviewCreatorLayout } from "../review-creator";
import { ContractCommentSectionLayout } from "../contract-comments-section";
import Head from "next/head";
import { FormattedMessage } from "react-intl";

class HiringPreviewLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoDesktopPlayIcon: "fa-play",
      showVideo: false,
      readyState: false,
      videoResolution: "dieciseis-nueve", // 1  -  1-33  -  1-77
      videoGridCols: "col-md-4 col-lg-4",
      videoDetailsGridCols: "col-md-8 col-lg-8"
    };

    this.session = new Session();
    this.videoDesktopRef = React.createRef();

    this.playDesktopVideo = this.playDesktopVideo.bind(this);
    this.goToCelebrity = this.goToCelebrity.bind(this);
  }

  componentDidMount() {
    this.videoDesktopRef.current.addEventListener("loadeddata", (e) => {
      if (this.videoDesktopRef.current.videoHeight > 0) {
        const res =
          this.videoDesktopRef.current.videoHeight /
          this.videoDesktopRef.current.videoWidth;
        let resolution = this.state.videoResolution;
        let videoGridCols = this.state.videoGridCols;
        let videoDetailsGridCols = this.state.videoDetailsGridCols;
        if (res > 1.2 && res < 1.6) {
          resolution = "cuatro-tres";
          videoGridCols = "col-md-5 col-lg-5";
          videoDetailsGridCols = "col-md-7 col-lg-7";
        } else if (res > 1.6) {
          resolution = "dieciseis-nueve";
          videoGridCols = "col-md-4 col-lg-4";
          videoDetailsGridCols = "col-md-8 col-lg-8";
        } else {
          resolution = "uno-uno"; // 1  -  1-33  -  1-77
          videoGridCols = "col-md-7 col-lg-7";
          videoDetailsGridCols = "col-md-5 col-lg-5";
        }

        this.setState({
          ...this.state,
          videoGridCols,
          videoDetailsGridCols,
          resolution,
          readyState: true
        });
      }
    });
    setTimeout(() => {
      if (this.state.readyState === false) {
        this.setState({
          ...this.state,
          readyState: true
        });
      }
    }, 15000);
  }

  playDesktopVideo() {
    if (this.videoDesktopRef.current.paused) {
      this.setState({ videoDesktopPlayIcon: "fa-pause" }, () => {
        this.videoDesktopRef.current.play();
      });
    } else {
      this.setState({ videoDesktopPlayIcon: "fa-play" }, () => {
        this.videoDesktopRef.current.pause();
      });
    }
  }

  goToCelebrity() {
    history._pushRoute(
      PATHS.CELEBRITY_PROFILE.replace(
        ":celebrity_username",
        this.props.contract.celebrityData.username
      )
    );
  }

  renderContractDetails() {
    if (this.session.getSession()) {
      return (
        <>
          {this.session.getSession().id === this.props.contract.userData.id ? (
            <div className="to-from">
              <h5 className="font-weight-bold">Para:</h5>
              <h5 className="text-with-ellipsis pr-4">
                {this.props.contract.deliveryTo
                  ? this.props.contract.deliveryTo
                  : "----"}
              </h5>
              <hr />
              <h5 className="font-weight-bold">De:</h5>
              <h5 className="text-with-ellipsis pr-4">
                {this.props.contract.deliveryFrom
                  ? this.props.contract.deliveryFrom
                  : "----"}
              </h5>
              <hr />
            </div>
          ) : null}
        </>
      );
    }
  }

  renderContractReview() {
    if (this.session.getSession()) {
      return (
        <>
          {this.session.getSession().id === this.props.contract.userData.id ? (
            <div className="reviews">
              <ReviewCreatorLayout contract={this.props.contract} />
            </div>
          ) : null}
        </>
      );
    }
  }

  renderContractComments() {
    if (this.session.getSession()) {
      return (
        <>
          {this.session.getSession().id !== this.props.contract.userData.id ? (
            <ContractCommentSectionLayout contract={this.props.contract} />
          ) : null}
        </>
      );
    } else {
      return <ContractCommentSectionLayout contract={this.props.contract} />;
    }
  }

  returnPoster = (videoURL) => {
    if (videoURL.includes("watermark")) {
      let posterURL = videoURL;
      posterURL = posterURL
        .replace(".mp4", ".jpg")
        .replace("watermark", "poster");
      return posterURL;
    }
    return videoURL;
  };

  changePlayPauseIcon = (event) => {
    this.setState({ videoDesktopPlayIcon: "fa-pause" });
  };

  render() {
    return (
      <div className={"HiringPreviewLayout"}>
        {this.props.contract.celebrityData.username && (
          <div>
            <Head>
              <title>
                Famosos.com - {this.props.contract.celebrityData.fullName}
              </title>
              <meta
                name="description"
                content={
                  "Perfil oficial de " +
                  this.props.contract.celebrityData.fullName +
                  " en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas."
                }
              />
              <meta
                property="og:title"
                content={
                  "Famosos.com - " + this.props.contract.celebrityData.fullName
                }
              />
              <meta
                property="og:url"
                content={
                  "https://famosos.com/" +
                  this.props.contract.celebrityData.username
                }
              />
            </Head>
          </div>
        )}

        {/*<div className={"loading-container mx-auto " + (!this.state.readyState ? " on " : " off ")}>
                    <div className="stage">
                        <img src={"https://v.fastcdn.co/u/054523e2/48208445-0-FAMOSOS-favicon.png"} width="100%"/>
                    </div>
                </div>*/}

        <div
          className={
            "main-section f-shadow " + (this.state.readyState ? " ready " : "")
          }
        >
          <div className="row p-0 m-0">
            <div
              className={
                "col-sm-12 video-container p-0 m-0 " + this.state.videoGridCols
              }
            >
              <div className={" f-video " + this.state.resolution}>
                <i
                  className={
                    "fa fa-2x play-pause " + this.state.videoDesktopPlayIcon
                  }
                  onClick={this.playDesktopVideo.bind(this)}
                />
                <video
                  autoPlay={true}
                  poster={this.returnPoster(
                    this.props.contract.celebrityData.avatar
                  )}
                  id={"video1"}
                  src={this.props.contract.media + "#t=0.5"}
                  ref={this.videoDesktopRef}
                  controls={false}
                  onClick={this.playDesktopVideo.bind(this)}
                  onPlay={this.changePlayPauseIcon}
                  playsInline={true}
                  preload="metadata"
                />
              </div>
            </div>
            <div
              className={
                "col-sm-12 details-container p-0 m-0 " +
                this.state.videoDetailsGridCols
              }
              style={{ minHeight: "730px" }}
            >
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
                    <img
                      className="celebrity-avatar"
                      src={
                        this.props.contract.celebrityData
                          ? this.props.contract.celebrityData.avatar
                          : ""
                      }
                      alt={"avatar"}
                      onClick={this.goToCelebrity}
                    />
                    <div
                      className="ml-2 font-weight-bold cursor-pointer celebrity-name"
                      onClick={this.goToCelebrity}
                    >
                      <h4>
                        {this.props.contract.celebrityData
                          ? this.props.contract.celebrityData.fullName
                          : "----"}
                      </h4>
                    </div>
                    <br />
                    <div className="mb-4">
                      <h6 className="font-weight-bold">
                        <FormattedMessage defaultMessage="Compartir video en:" />
                      </h6>
                      <ShareContractLayout contract={this.props.contract} />
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
  }
}

export { HiringPreviewLayout };
