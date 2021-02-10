import React, { Component } from "react";

import { connect } from "react-redux";
import { CelebrityPublicContractCardLayout } from "../celebrity-public-contract-card";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { PaginationLayout } from "../pagination";
import { CelebrityShimmerCardLayout } from "../celebrity-shimmer-card";
import { ContractPriceLayout } from "../contract-price/index";
import * as PATHS from "../../../routing/Paths";
import { history } from "../../../routing/History";
import * as CarouselWithButtons from "../carousel-with-buttons";
import { CelebrityContractVideoShimmerCardLayout } from "../celebrity-contract-video-shimmer-card";
import { CelebrityPublicContractCardAlternativeLayout } from "../celebrity-public-contract-card-alternative";
import { VideoShimmerCardLayout } from "../video-shimmer-card";
import { Session } from "../../../state/utils/session";

import * as GTM from "../../../state/utils/gtm";

class CelebrityPublicContractsSectionLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {}
    };

    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.fetchPublicContracts = this.fetchPublicContracts.bind(this);
    this.goToCreateContract = this.goToCreateContract.bind(this);
  }

  fetchPublicContracts() {
    this.props.listPublicContracts(this.props.celebrityId, this.state.params);
  }

  onPaginationChange(page) {
    this.updateParams("currentPage", page);
  }

  updateParams(key, value) {
    const { params } = this.state;
    params[key] = value;
    if (key === "search") {
      params["currentPage"] = 1;
    }
    this.setState(
      {
        params: params
      },
      () => this.fetchPublicContracts()
    );
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

  renderCelebrityPublicVideoCards() {
    return this.props.publicContracts.map((publicContract, index) => {
      return (
        <div
          className="item mr-4 mb-2 mx-auto"
          key={index + "-" + publicContract.reference}
        >
          <CelebrityPublicContractCardLayout publicContract={publicContract} />

          <div className="col-12 p-0 m-0 d-md-none text-center pr-0">
            {this.returnContractPrice() > 0 ? (
              <div className="mt-3 mb-3" onClick={this.goToCreateContract}>
                <button className="btn btn-sm f-contract-button">
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
            {/* {this.returnSecondaryButton()} */}
          </div>

          {/* Fin del codigo nuevo */}
        </div>
      );
    });
  }

  renderShimmerPublicVideoCards() {
    const shimmersCards = [];
    for (let index = 0; index < 8; index++) {
      shimmersCards.push(
        <div className="item mr-4 mb-2 mx-auto" key={index}>
          <CelebrityShimmerCardLayout className="public-contract-shimmer CelebrityPublicContractCardLayout" />
        </div>
      );
    }
    return shimmersCards;
  }

  analyticsData = {
    widget: this.constructor.name,
    path: window.location.pathname,
    celebrityId: this.props.celebrityId,
    username: this.props.username
  };

  registerListHover = () => {
    GTM.tagManagerDataLayer(
      "HOVER_CELEBRITY_PUBLIC_CONTRACTS_LIST",
      this.analyticsData
    );
  };

  registerListScroll = (hasReachedListEnd) => {
    GTM.tagManagerDataLayer("SCROLL_CELEBRITY_PUBLIC_CONTRACTS_LIST", {
      ...this.analyticsData,
      hasReachedListEnd
    });
  };

  registerCelebrityPublicContractsScrollButtonClick = (direction) => {
    GTM.tagManagerDataLayer(
      "CLICK_CELEBRITY_PUBLIC_CONTRACTS_SECTION_SCROLL_BUTTON",
      { ...this.analyticsData, direction }
    );
  };

  render() {
    const hasContracts = this.props.publicContracts.length > 0;
    return this.props.isLoading || hasContracts ? (
      <div className="CelebrityPublicContractsSectionLayout">
        <CarouselWithButtons.Container
          buttonsStyles={{ top: "1.25rem", height: "344px" }}
          onScrollTo={this.registerCelebrityPublicContractsScrollButtonClick}
          onListScroll={this.registerListScroll}
        >
          <CarouselWithButtons.List>
            <ul
              className="CelebrityPublicContractsSectionLayout__list"
              onMouseOver={this.registerListHover}
            >
              {!this.props.isLoading
                ? this.props.publicContracts.map((publicContract) => (
                    <li className="mr-3" key={publicContract.contract_id}>
                      <CelebrityPublicContractCardAlternativeLayout
                        publicContract={publicContract}
                        videoKey={`${this.props.celebrityId}-${this.props.username}-${publicContract.contract_reference}`}
                        celebrityFullName={this.props.celebrityFullName}
                        celebrityAvatar={this.props.celebrityAvatar}
                      />
                    </li>
                  ))
                : Array(15)
                    .fill(null)
                    .map((item, index) => (
                      <li className="mr-3" key={index}>
                        <VideoShimmerCardLayout />
                      </li>
                    ))}
            </ul>
          </CarouselWithButtons.List>
        </CarouselWithButtons.Container>
      </div>
    ) : null;
    return this.props.isLoading || hasContracts ? (
      <div className="CelebrityPublicContractsSectionLayout">
        <div className="f-container mb-2 pb-2">
          <div className={"f-main-padding"}>
            <div className="clearfix ml-4">
              <h6 className="float-left font-weight-bold">Videos</h6>
            </div>
            <div className={"scrolling-wrapper"}>
              {this.props.isLoading
                ? this.renderShimmerPublicVideoCards()
                : this.renderCelebrityPublicVideoCards()}
            </div>
            <div className="col-12">
              {/* PaginationLayout */}
              <PaginationLayout
                showFmainPadding={false}
                pagination={this.props.paginationData}
                onPaginationChange={this.onPaginationChange}
              />
              {/* End PaginationLayout */}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

// Set propTypes
CelebrityPublicContractsSectionLayout.propTypes = {};

// Set defaultProps
CelebrityPublicContractsSectionLayout.defaultProps = {
  celebrity: {},
  publicContracts: [],
  paginationData: {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
  currencyExchangeData: state.payments.currencyExchangeReducer.data,
  isLoading: state.celebrities.fetchPublicContractsReducer.loading,
  publicContracts: state.celebrities.fetchPublicContractsReducer.data.results,
  paginationData:
    state.celebrities.fetchPublicContractsReducer.data.informationPage
});

// mapStateToProps
const mapDispatchToProps = {
  listPublicContracts: celebrityOperations.listPublicContracts
};

// Export Class
const _CelebrityPublicContractsSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityPublicContractsSectionLayout);
export { _CelebrityPublicContractsSectionLayout as CelebrityPublicContractsSectionLayout };
