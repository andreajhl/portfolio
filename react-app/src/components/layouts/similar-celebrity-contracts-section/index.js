import React, { Component } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import { SimilarCelebrityContractCardLayout } from "../similar-celebrity-contract-card";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { PaginationLayout } from "../pagination";
import { CelebrityShimmerCardLayout } from "../celebrity-shimmer-card";
import { ContractPriceLayout } from "../contract-price/index";
import * as PATHS from "../../../routing/Paths";
import { history } from "../../../routing/History";
import * as CarouselWithButtons from "../carousel-with-buttons";

import { Session } from "../../../state/utils/session";

import * as GTM from "../../../state/utils/gtm";

class SimilarCelebrityContractsSectionLayout extends Component {
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

  // renderCelebrityPublicVideoCards() {
  //   return this.props.publicContracts.map((publicContract, index) => {
  //     return (
  //       <div
  //         className="item mr-4 mb-2 mx-auto"
  //         key={index + "-" + publicContract.reference}
  //       >
  //         <CelebrityPublicContractCardLayout publicContract={publicContract} />

  //         <div className="col-12 p-0 m-0 d-md-none text-center pr-0">
  //           {this.returnContractPrice() > 0 ? (
  //             <div className="mt-3 mb-3" onClick={this.goToCreateContract}>
  //               <button className="btn btn-sm f-contract-button">
  //                 Comprar Video Personalizado por{" "}
  //                 <ContractPriceLayout
  //                   classes={"text-white font-weight-bold"}
  //                   price={this.returnContractPrice()}
  //                   currency={this.props.currencyExchangeData.to}
  //                   rounding={true}
  //                 />
  //                 <i className="fa fa-arrow-right" />
  //               </button>
  //             </div>
  //           ) : null}
  //           {/* {this.returnSecondaryButton()} */}
  //         </div>

  //         {/* Fin del codigo nuevo */}
  //       </div>
  //     );
  //   });
  // }

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

  render() {
    // const hasContracts = this.props.publicContracts.length > 0;
    return /* this.props.isLoading || hasContracts */ true ? (
      <div className="SimilarCelebrityContractsSectionLayout">
        <CarouselWithButtons.Container
          buttonsStyles={{ top: "2.75rem", height: "370px" }}
        >
          <CarouselWithButtons.Header>
            <CarouselWithButtons.Title className="text-black text-center mb-4 w-100">
              Famosos similares
            </CarouselWithButtons.Title>
          </CarouselWithButtons.Header>
          <CarouselWithButtons.List>
            <ul className="SimilarCelebrityContractsSectionLayout__list">
              {Array(7)
                .fill(null)
                .map((publicContract, index) => (
                  <li className="mr-3">
                    <SimilarCelebrityContractCardLayout
                      similarCelebrityContract={{
                        celebrityData: {
                          avatar:
                            "https://dqb0851cl2gjs.cloudfront.net/celebrities/70/avatar/famosos-videos-personalizados-giuliomottola-compressed.jpg",
                          categoryTitle: "Adultos",
                          fullName: "Giulio Mottola",
                          countryCode: "VEN"
                        },
                        videoUrl:
                          "https://dqb0851cl2gjs.cloudfront.net/main-videos/70/famosos-videos-personalizados-giuliomottola-crf-video-watermark480.mp4",
                        deliveryTo: "German Solano",
                        reference: "test-" + index
                      }}
                    />
                  </li>
                ))}
            </ul>
          </CarouselWithButtons.List>
        </CarouselWithButtons.Container>
      </div>
    ) : null;
    return this.props.isLoading || true /* hasContracts */ ? (
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
SimilarCelebrityContractsSectionLayout.propTypes = {};

// Set defaultProps
SimilarCelebrityContractsSectionLayout.defaultProps = {
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
const _SimilarCelebrityContractsSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimilarCelebrityContractsSectionLayout);
export { _SimilarCelebrityContractsSectionLayout as SimilarCelebrityContractsSectionLayout };
