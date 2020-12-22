import React, { Component } from "react";
import "./styles.scss";
import * as GTM from "../../../state/utils/gtm";
import { history } from "../../../routing/History";
import { ContractPriceLayout } from "../contract-price";
import { connect } from "react-redux";
import { Session } from "../../../state/utils/session";
import * as PATHS from "../../../routing/Paths";
import { FlashDeliveryBadgeLayout } from "../flash-delivery-badge";

class CelebrityDetailsCardLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLoaded: false,
      videoMobilePlayIcon: "fa-play",
      videoDesktopPlayIcon: "fa-play",
      videoDesktopIsMuted: true,
      videoMobileIsMuted: true
    };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.goToCreateContract = this.goToCreateContract.bind(this);
    this.playDesktopVideo = this.playDesktopVideo.bind(this);
    this.playMobileVideo = this.playMobileVideo.bind(this);
    this.goToCause = this.goToCause.bind(this);

    this.videoMobileRef = React.createRef();
    this.videoDesktopRef = React.createRef();
  }

  handleImageLoaded() {
    this.setState({ imageLoaded: true });
  }

  goToCreateContract() {
    GTM.tagManagerDataLayer("CLICK_ON_CONTRACT_BUTTON", this.props.celebrity);
    const session = new Session();
    if (session.isDummy()) {
      localStorage.setItem(
        "finalRedirect",
        "/" + this.props.username + "/contratar"
      );
      history._pushRoute(PATHS.AUTH_FLOW);
    } else {
      history._pushRoute(this.props.username + "/contratar");
    }
  }

  playDesktopVideo() {
    if (this.videoDesktopRef.current.paused) {
      this.setState({ videoDesktopPlayIcon: "fa-pause" }, () => {
        this.videoDesktopRef.current.play();
      });
      GTM.tagManagerDataLayer("PLAYING_MAIN_VIDEO", this.props.celebrity);
    } else {
      this.setState({ videoDesktopPlayIcon: "fa-play" }, () => {
        this.videoDesktopRef.current.pause();
      });
      GTM.tagManagerDataLayer("STOPPED_MAIN_VIDEO", this.props.celebrity);
    }
  }

  playMobileVideo() {
    this.videoMobileRef.current.addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
        e.stopPropagation();
      },
      false
    );
    if (this.videoMobileRef.current.hasAttribute("controls")) {
      this.videoMobileRef.current.removeAttribute("controls");
    }
    this.videoMobileRef.current.classList.add("IIV");
    if (this.videoMobileRef.current.paused) {
      this.setState({ videoMobilePlayIcon: "fa-pause" }, () => {
        this.videoMobileRef.current.play();
      });
      GTM.tagManagerDataLayer("PLAYING_MAIN_VIDEO", this.props.celebrity);
    } else {
      this.setState({ videoMobilePlayIcon: "fa-play" }, () => {
        this.videoMobileRef.current.pause();
      });
      GTM.tagManagerDataLayer("STOPPED_MAIN_VIDEO", this.props.celebrity);
    }
  }

  goToCause() {
    window.location.replace(this.props.causeUrl);
  }

  returnContractPrice() {
    const res = this.props.contractTypes.find((x) => x.contractType === 1);
    let videoMessagePrice = 0;
    if (res) {
      videoMessagePrice = res.price;
    }
    if (this.props.currencyExchangeData.rate > 1) {
      return (
        videoMessagePrice * this.props.currencyExchangeData.rate +
        videoMessagePrice
      );
    } else {
      return videoMessagePrice;
    }
  }

  goToSpecialVideoMessageLink = () => {
    const res = this.props.contractTypes.find((x) => x.contractType === 2);
    if (res) {
      if (res.options) {
        if (res.options.buttonLabel && res.options.url) {
          return (window.location.href = res.options.url);
        }
        return null;
      }
      return null;
    }
    return null;
  };

  returnSecondaryButton = () => {
    const res = this.props.contractTypes.find((x) => x.contractType === 2);
    if (res) {
      if (res.options) {
        if (res.options.buttonLabel && res.options.url) {
          return (
            <div
              className="mt-1 mb-3"
              onClick={this.goToSpecialVideoMessageLink}
            >
              <button className="btn btn-outline-primary btn-sm f-contract-button invert">
                {res.options.buttonLabel}
                <i className="fa fa-arrow-right" />
              </button>
            </div>
          );
        }
        return null;
      }
      return null;
    }
    return null;
  };

  returnTurnAroundText = () => {
    if (this.props.turnaround < 1) {
      return <span style={{ fontSize: "12px" }}>Pocas horas</span>;
    } else if (this.props.turnaround === 1) {
      return <span>{parseInt(this.props.turnaround)} día</span>;
    } else {
      return <span>{parseInt(this.props.turnaround)} días</span>;
    }
  };

  autoPlayMainVideo = (deviceType) => (event) => {
    const userHasGoodInternet = navigator?.connection?.effectiveType === "4g";

    const videoIsVisible =
      getComputedStyle(
        event.target.closest(
          `.profile-${deviceType === "desktop" ? "lg" : "sm"}`
        )
      ).display !== "none";

    if (videoIsVisible && userHasGoodInternet) {
      deviceType === "desktop"
        ? this.playDesktopVideo()
        : this.playMobileVideo();
    }
  };

  toggleVideoDesktopIsMuted = () => {
    this.setState({ videoDesktopIsMuted: !this.state.videoDesktopIsMuted });
  };

  toggleVideoMobileIsMuted = (event) => {
    event.preventDefault();
    if (event.stopPropagation) event.stopPropagation();
    this.setState({ videoMobileIsMuted: !this.state.videoMobileIsMuted });
  };

  render() {
    return (
      <div className="CelebrityDetailsCardLayout mb-2 pb-2">
        <div className="f-container">
          {/*PROFILE LG*/}
          <div className="d-none d-md-block profile-lg">
            <div className="row f-section mx-auto">
              <div
                className={this.props.mainVideo ? "col-8" : "col-10 mx-auto"}
              >
                <div className="row f-card mx-auto">
                  <div className="col-3 col-md-4 f-avatar my-auto">
                    <div className="rounded-circle f-shadow">
                      <img
                        className="rounded-circle"
                        onLoad={this.handleImageLoaded}
                        src={
                          !this.state.imageLoaded
                            ? "/assets/img/avatar-blank.png"
                            : this.props.avatar
                        }
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="col-9 col-md-8 details my-auto">
                    <div className="row p-0 pl-3 pr-3">
                      <div className="col-12 p-0 m-0 f-names my-auto d-flex justify-content-between flex-wrap">
                        <h5 className="text-dark font-weight-bold pt-1 m-0">
                          {this.props.fullName}
                        </h5>
                        <FlashDeliveryBadgeLayout
                          celebrityUsername={this.props.username}
                          color="dark"
                          showTime
                          className="profile-lg__flash-delivery"
                        />
                      </div>
                      <div className="col-12 p-0 m-0 text-center pr-0">
                        {this.returnContractPrice() > 0 ? (
                          <div
                            className="mt-3 mb-3"
                            onClick={this.goToCreateContract}
                          >
                            <button className="btn  btn-sm f-contract-button">
                              Comprar Video Personalizado por{" "}
                              <ContractPriceLayout
                                classes={"text-white font-weight-bold"}
                                price={this.returnContractPrice()}
                                currency={this.props.currencyExchangeData.to}
                                rounding={true}
                              />
                              <i className="fa fa-arrow-right" />
                            </button>
                          </div>
                        ) : null}
                        {this.returnSecondaryButton()}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="row mt-2 text-center">
                      <div className="col-sm-12 col-md-4 col-lg-4 mb-2">
                        <h6 className="text-warning">
                          <i className="fa fa-star fa-1x mr-2 text-warning" />
                          <i className="fa fa-star fa-1x mr-2 text-warning" />
                          <i className="fa fa-star fa-1x mr-2 text-warning" />
                          <i className="fa fa-star fa-1x mr-2 text-warning" />
                          <i className="fa fa-star fa-1x mr-2 text-warning" />
                        </h6>
                        <small className="text-soft-grey font-weight-bold">
                          Calificaciones
                        </small>
                      </div>
                      <div className="col-sm-12 col-md-4 col-lg-4 mb-2">
                        <h6 className="font-weight-bold">
                          {this.props.categoryTitle}
                        </h6>
                        <small className="text-soft-grey font-weight-bold">
                          Categoría
                        </small>
                      </div>
                      <div className="col-sm-12 col-md-4 col-lg-4 mb-2">
                        <h6 className="font-weight-bold">
                          {this.returnTurnAroundText()}
                        </h6>
                        <small className="text-soft-grey font-weight-bold">
                          Respuesta promedio
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-1 text-justify description border-bottom">
                    <small>{this.props.description}</small>
                  </div>
                  {this.props.isDonor ? (
                    <div className="col-12 mt-1 text-justify">
                      <div className="foundation">
                        <i className="fas fa-hand-holding-heart" />
                        <img
                          className="bookmark"
                          src="/assets/img/bookmark.svg"
                          alt="bookmark"
                        />
                        <div className="celebrity-data">
                          <small>
                            {this.props.fullName} dona <br />
                            de sus ingresos a:
                          </small>
                        </div>
                        <div className="cause-name">
                          <small className="text-primary font-weight-bold">
                            {this.props.causeName}
                          </small>
                        </div>
                        {/*{*/}
                        {/*    this.props.causeLogo &&*/}
                        {/*    <img className="causeLogo"*/}
                        {/*         src={this.props.causeLogo}*/}
                        {/*         alt="causeLogo"/>*/}
                        {/*}*/}
                        <i className="fa fa-info-circle customTooltip">
                          <span className="tooltipText">
                            No existe ninguna relación entre Famosos Inc y esta
                            fundación
                          </span>
                        </i>
                      </div>
                    </div>
                  ) : null}
                  <div className="col-12 d-none d-md-block">
                    <img
                      width="100%"
                      src="/assets/img/steps_desktop_profile.png"
                    />
                  </div>
                  <div
                    className="col-12 text-justify"
                    style={{ height: "20px" }}
                  >
                    {this.props.socialNetworks
                      ? this.props.socialNetworks.map((i, index) => {
                          return (
                            <a
                              href={i.social_network.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              key={index}
                              className="text-secondary"
                            >
                              <small>
                                <i
                                  className={
                                    "fa-2x mr-4 " + i.social_network.fa_icon
                                  }
                                />
                              </small>
                            </a>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
              {this.props.mainVideo ? (
                <div className="col-4 f-video" style={{ padding: "0px" }}>
                  <div className="f-video-buttons">
                    {/* <i
                      className={
                        "fa fa-2x play-pause cursor-pointer " +
                        this.state.videoDesktopPlayIcon
                      }
                      onClick={this.playDesktopVideo.bind(this)}
                    /> */}
                    <i
                      className={`fa fa-2x fa-volume-${
                        this.state.videoDesktopIsMuted ? "mute" : "up"
                      } volume-icon cursor-pointer`}
                      onClick={this.toggleVideoDesktopIsMuted}
                    />
                  </div>
                  <video
                    ref={this.videoDesktopRef}
                    controls={false}
                    onClick={this.playDesktopVideo.bind(this)}
                    playsInline={true}
                    preload="metadata"
                    muted={this.state.videoDesktopIsMuted}
                    onCanPlay={this.autoPlayMainVideo("desktop")}
                  >
                    <source
                      src={this.props.mainVideo + "#t=0.5"}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : null}
            </div>
          </div>
          {/*PROFILE SM*/}
          <div className="d-block d-md-none profile-sm">
            <div
              className={`row f-section mx-auto sm-row ${
                !this.props.mainVideo ? "no-main-video" : ""
              }`}
            >
              <div className="col-12">
                <div
                  className="f-video text-center"
                  onClick={this.playMobileVideo.bind(this)}
                >
                  {this.props.mainVideo ? (
                    <>
                      <div className="f-video-buttons">
                        {/* <i
                          className={
                            "fa fa-2x play-pause cursor-pointer " +
                            this.state.videoMobilePlayIcon
                          }
                          onClick={this.playMobileVideo.bind(this)}
                        /> */}
                        <i
                          className={`fa fa-2x fa-volume-${
                            this.state.videoMobileIsMuted ? "mute" : "up"
                          } volume-icon cursor-pointer`}
                          onClick={this.toggleVideoMobileIsMuted}
                        />
                      </div>

                      <video
                        preload="metadata"
                        style={{
                          background: "url('" + this.props.avatar + "')",
                          backgroundSize: "cover"
                        }}
                        ref={this.videoMobileRef}
                        width="100%"
                        height="460px"
                        controls={false}
                        playsInline={true}
                        onClick={this.playMobileVideo.bind(this)}
                        muted={this.state.videoMobileIsMuted}
                        onCanPlay={this.autoPlayMainVideo("mobile")}
                      >
                        <source
                          src={this.props.mainVideo + "#t=0.5"}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <FlashDeliveryBadgeLayout
                        celebrityUsername={this.props.username}
                        color="dark"
                        showTime
                        className="profile-sm__flash-delivery"
                      />
                    </>
                  ) : null}
                  <div className="f-avatar f-shadow">
                    <img
                      onLoad={this.handleImageLoaded}
                      src={
                        !this.state.imageLoaded
                          ? "/assets/img/avatar-blank.png"
                          : this.props.avatar
                      }
                      alt="avatar"
                    />
                  </div>
                </div>
              </div>
              <div className="col-9 pt-3 pb-1">
                <h6 className="font-weight-bold title d-flex">
                  {this.props.fullName}
                </h6>
                {!this.props.mainVideo ? (
                  <FlashDeliveryBadgeLayout
                    celebrityUsername={this.props.username}
                    color="dark"
                    showTime
                    className="mt-3"
                  />
                ) : null}
              </div>
              <div className="col-4 pr-0 mt-2 f-reviews">
                <small className="title text-warning">
                  <i className="fa fa-star fa-1x mr-1 text-warning" />
                  <i className="fa fa-star fa-1x mr-1 text-warning" />
                  <i className="fa fa-star fa-1x mr-1 text-warning" />
                  <i className="fa fa-star fa-1x mr-1 text-warning" />
                  <i className="fa fa-star fa-1x mr-1 text-warning" />
                </small>
                <br />
                <small className="text-soft-grey font-weight-bold subtitle">
                  Calificaciones
                </small>
              </div>
              <div className="col-8 pl-0 text-right mt-2">
                <div className="">
                  <small className="text-soft-grey subtitle">
                    Categoría: <b>{this.props.categoryTitle}</b>
                  </small>
                  <br />
                  <small className="text-soft-grey subtitle">
                    Respuesta promedio: <b>{this.returnTurnAroundText()}</b>
                  </small>
                </div>
              </div>
              <div className="col-12 p-2">
                {this.returnContractPrice() > 0 ? (
                  <div className="mt-3 mb-3" onClick={this.goToCreateContract}>
                    <button className="btn  btn-sm f-contract-button">
                      Comprar Video Personalizado por{" "}
                      <ContractPriceLayout
                        classes={"text-white font-weight-bold"}
                        price={this.returnContractPrice()}
                        currency={this.props.currencyExchangeData.to}
                        rounding={true}
                      />
                      <i className="fa fa-arrow-right" />
                    </button>
                  </div>
                ) : null}
                {this.returnSecondaryButton()}
              </div>
            </div>
            {/*<div className="footer-btn my-auto p-4" onClick={this.goToCreateContract}>*/}
            {/*    <small className="ml-0 float-left text-uppercase text-white font-weight-bold">*/}
            {/*        Comprar video por <ContractPriceLayout*/}
            {/*        classes={"text-white font-weight-bold"}*/}
            {/*        price={this.returnContractPrice()}*/}
            {/*        currency={this.props.currencyExchangeData.to}*/}
            {/*        rounding={true}*/}
            {/*    />*/}
            {/*    </small>*/}
            {/*    <i className="fa fa-arrow-right float-right text-white" style={{ fontSize: "26px" }} />*/}
            {/*</div>*/}
          </div>
          {/*HASHTAGS*/}
          <div className="f-line w-100 mt-2 mb-2 text-soft-grey"></div>
          <div className="row f-section mx-auto">
            <div className="col-12 text-justify word-break">
              <h6>
                <small className="mr-1 hashtags text-soft-grey">
                  {this.props.hashtags.map((h, index) => {
                    return (
                      <span key={index} className="mr-3">
                        #{h}
                      </span>
                    );
                  })}
                </small>
              </h6>
            </div>
          </div>
        </div>
        {this.props.isDonor ? (
          <div className="d-block d-md-none profile-sm-foundation">
            <div className="col-12 mt-4 text-justify">
              <div className="foundation">
                <i className="fas fa-hand-holding-heart" />
                <img
                  className="bookmark"
                  src="/assets/img/bookmark.svg"
                  alt="bookmark"
                />
                <div className="celebrity-data">
                  <small>
                    {this.props.fullName} dona de
                    <br /> sus ingresos a:
                  </small>
                </div>
                <div className="cause-name">
                  <small className="text-primary font-weight-bold">
                    {this.props.causeName}
                  </small>
                </div>
                <i className="fa fa-info-circle customTooltip">
                  <span className="tooltipText">
                    No existe ninguna relación entre Famosos Inc y esta
                    fundación
                  </span>
                </i>
                {/*{*/}
                {/*    this.props.causeLogo &&*/}
                {/*    <img className="causeLogo" src={this.props.causeLogo}*/}
                {/*         alt="causeLogo"/>*/}
                {/*}*/}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

// default props
CelebrityDetailsCardLayout.defaultProps = {
  username: "",
  causeUrl: "",
  avatar: "",
  fullName: "",
  categoryTitle: "",
  isDonor: "",
  description: "",
  causeLogo: "",
  causeName: "",
  hashtags: [],
  mainVideo: "",
  socialNetworks: [],
  contractTypes: [],
  turnaround: 7
};

// mapStateToProps
const mapStateToProps = (state) => ({
  currencyExchangeData: state.payments.currencyExchangeReducer.data
});

// mapStateToProps
const mapDispatchToProps = {};

// Export Class
const _CelebrityDetailsCardLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityDetailsCardLayout);
export { _CelebrityDetailsCardLayout as CelebrityDetailsCardLayout };
