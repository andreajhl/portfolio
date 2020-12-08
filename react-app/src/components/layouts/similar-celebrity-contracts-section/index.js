import React, { Component } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import { SimilarCelebrityContractCardLayout } from "../similar-celebrity-contract-card";
import { fetchSimilarContracts } from "../../../state/ducks/contracts/actions";
import { PaginationLayout } from "../pagination";
import { CelebrityShimmerCardLayout } from "../celebrity-shimmer-card";
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

  componentDidMount() {
    this.props.getSimilarContracts(this.props.celebrityUsername);
  }

  render() {
    console.log(this.props.similarContracts);
    const hasContracts = this.props.similarContracts.length > 0;
    return this.props.isLoading || hasContracts ? (
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
              {this.props.similarContracts.map((similarContract) => (
                <li className="mr-3" key={similarContract.contractReference}>
                  <SimilarCelebrityContractCardLayout
                    similarContract={similarContract}
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
  paginationData: {},
  similarContracts: []
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.contracts.fetchSimilarContractsReducer.loading,
  similarContracts: state.contracts.fetchSimilarContractsReducer.data.results
});

// mapStateToProps
const mapDispatchToProps = {
  getSimilarContracts: fetchSimilarContracts
};

// Export Class
const _SimilarCelebrityContractsSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimilarCelebrityContractsSectionLayout);
export { _SimilarCelebrityContractsSectionLayout as SimilarCelebrityContractsSectionLayout };
