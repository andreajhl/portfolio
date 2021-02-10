import React, { Component } from "react";
import { PageContainer } from "../../layouts/page-container";
import { HiringPreviewLayout } from "../../layouts/hiring-preview";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import * as GTM from "../../../state/utils/gtm";
import Maybe from "../../common/helpers/maybe";
import { withRouter } from "next/router";

class HiringPreviewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {}
    };
  }

  componentDidMount() {
    this.props.getContract(this.props.router.query.contract_reference);

    // document.getElementsByClassName("f-main-body")[0].style.background =
    //   "#f7f7f7";
    GTM.tagManagerDataLayer("HIRING_PREVIEW_PAGE_VIEW", this.props.router);
  }

  componentWillUnmount() {
    // document.getElementsByClassName("f-main-body")[0].style.background = "#fff";
  }

  componentDidUpdate(previousProps) {
    if (
      this.props.router.query.contract_reference &&
      previousProps.router.query.contract_reference !==
        this.props.router.query.contract_reference
    )
      this.props.getContract(this.props.router.query.contract_reference);
  }

  render() {
    return (
      <>
        <div className="HiringPreviewPage">
          <PageContainer
            applyFetchCelebrities={false}
            showFooter={this.props.isCompleted}
          >
            <Maybe it={Boolean(this.props.contract.reference)}>
              <HiringPreviewLayout contract={this.props.contract} />
            </Maybe>
            <br />
          </PageContainer>
        </div>
      </>
    );
  }
}

// Set propTypes
HiringPreviewPage.propTypes = {};

// Set defaultProps
HiringPreviewPage.defaultProps = {
  contract: {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.contracts.getContractReducer.loading,
  contract: state.contracts.getContractReducer.data,
  isCompleted: state.contracts.getContractReducer.completed
});

// mapStateToProps
const mapDispatchToProps = {
  getContract: contractOperations.getContract
};

// Export Class
const _HiringPreviewPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HiringPreviewPage));

export { _HiringPreviewPage as HiringPreviewPage };
