import React, { Component } from "react";
import { CelebrityCardLayout } from "../celebrity-card";
import "./styles.scss";
import { getTotalColumns } from "../../../state/utils/gridSystem";
import { CelebrityShimmerCardLayout } from "../celebrity-shimmer-card";
import { VideoCardLayout } from "../video-card";
import { VideoShimmerCardLayout } from "../video-shimmer-card";
import { connect } from "react-redux";

const CelebritiesSectionLayout = ({ title, type }) => {
  return (
    <section className="celebrities-section-layout container pr-0">
      <h2 className="celebrities-section-layout__title">{title}</h2>
      <ul className="celebrities-section-layout__cards-list">
        {Array(7).fill(
          type !== "video" ? (
            <>
              <li className="celebrities-section-layout__card-item">
                <CelebrityShimmerCardLayout />
              </li>
              <li className="celebrities-section-layout__card-item">
                <CelebrityCardLayout celebrity={{ fullName: "German" }} />
              </li>
            </>
          ) : (
            <>
              <li className="celebrities-section-layout__card-item">
                <VideoCardLayout />
              </li>
              <li className="celebrities-section-layout__card-item">
                <VideoShimmerCardLayout />
              </li>
            </>
          ),
          0,
          7
        )}
      </ul>
    </section>
  );
};

const VideosCardsSectionLayout = ({ title }) => {
  return (
    <section className="videos-section-layout container pr-0">
      <h2 className="videos-section-layout__title">{title}</h2>
      <ul className="videos-section-layout__cards-list">
        <li className="videos-section-layout__card-item">
          <VideoCardLayout />
        </li>
        <li className="videos-section-layout__card-item">
          <VideoShimmerCardLayout />
        </li>
      </ul>
    </section>
  );
};

const CelebrityCardsSectionLayout = (props) => {
  return (
    <div className="CelebrityCardsSectionLayout">
      <CelebritiesSectionLayout title="Actores" />
      <CelebritiesSectionLayout title="Famosos destacados" />
      <CelebritiesSectionLayout title="Videos destacados" type="video" />
    </div>
  );
};

class CelebrityCardsSectionLayout1 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderShimmerCards() {
    if (this.props.showShimmerCards) {
      return (
        <div className="scrolling-wrapper">
          {[...Array(getTotalColumns() * 6)].map((o, index) => {
            return (
              <div className="item mr-4 mb-2 mx-auto" key={index}>
                <CelebrityShimmerCardLayout />
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div
          className={
            "scrolling-wrapper " +
            (this.props.horizontalScroll ? "horizontal-scroll" : "")
          }
        >
          {this.renderCelebritiesCards()}
        </div>
      );
    }
  }

  renderLoading() {
    if (this.props.showLoading) {
      return (
        <div className="mx-auto text-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }

  renderCelebritiesCards() {
    if (!this.props.showShimmerCards) {
      return this.props.celebrities.map((celebrity, index) => {
        return (
          <div
            className="item mr-4 mx-auto"
            key={"celebrity" + celebrity.id + "-" + index}
          >
            <CelebrityCardLayout celebrity={celebrity} />
          </div>
        );
      });
    }
  }

  renderTitle() {
    if (this.props.title && !this.props.queryParams.search) {
      return (
        <div className="text-left section-title">
          <b>{this.props.title}</b>
        </div>
      );
    } else if (
      this.props.title !== "Famosos Similares" &&
      this.props.queryParams.search &&
      !this.props.celebrities.length
    ) {
      return (
        <div className="text-left section-title">
          <b>No se encontraron famosos para esta busqueda</b>
        </div>
      );
    } else if (this.props.title) {
      return (
        <div className="text-left section-title">
          <b>Famosos encontrados:</b>
        </div>
      );
    }
  }

  render() {
    return (
      <div
        className="CelebrityCardsSectionLayout"
        style={{
          minHeight: this.props.minHeight ? "100vh" : "initial",
        }}
      >
        <div className="text-left section-title">
          <b>{this.props.title}</b>
        </div>
        {/* SHIMMER CARDS */}
        {this.renderShimmerCards()}
        {/* LOADING */}
        {this.renderLoading()}
      </div>
    );
  }
}

// default props
CelebrityCardsSectionLayout.defaultProps = {
  horizontalScroll: false,
  title: "",
  showShimmerCards: true,
  showLoading: false,
  celebrities: [],
  minHeight: false,
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
  queryParams: state.celebrities.queryParamsReducer,
});

// mapStateToProps
const mapDispatchToProps = {};

// Export Class
const _CelebrityCardsSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityCardsSectionLayout);
export { _CelebrityCardsSectionLayout as CelebrityCardsSectionLayout };
