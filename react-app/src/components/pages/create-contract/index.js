import React, { Component } from "react";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts/page-container";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import * as GTM from "../../../state/utils/gtm";
import { CreateContractForm } from "../../containers/create-contract-form";
import { Session } from "../../../state/utils/session";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import { hiring_proccess_img } from "constants/external_assets_by_lang";
// import { Redirect } from "react-router-dom";
import { withRouter } from "next/router";

const getContractPriceVideoMessage = (contractsTypes) =>
  contractsTypes?.find?.((contract) => contract.contractType === 1)?.price || 0;

class CreateContractPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    GTM.tagManagerDataLayer("CREATE_CONTRACT_PAGE_VIEW", this.props.match);
    // const session = new Session();
  }

  render() {
    // if (!this.props.auth0.isLoading) {
    //   if (!this.props.auth0.isAuthenticated) {
    //     localStorage.setItem(
    //       "finalRedirect",
    //       "/" + this.props.match.params["celebrity_username"] + "/contratar"
    //     );
    //   }
    // }
    // let RedirectTo = !this.props.auth0.isLoading ? (
    //   this.props.auth0.isAuthenticated ? null : (
    //     <Redirect to={PATHS.SIGN_IN_PATH}></Redirect>
    //   )
    // ) : null;

    const { router } = this.props;
    return (
      <>
        {/* {RedirectTo} */}
        <PageContainer
          showFooter={false}
          showLogin={false}
          showSearch={false}
          fetchCelebrities={false}
          hideControls={true}
        >
          <div className={"CreateContractPage row mx-auto my-auto"}>
            {/* FORM */}
            <div className={"col-sm-12 col-lg-6 mx-auto my-auto p-0 m-0"}>
              <CreateContractForm
                contractPrice={getContractPriceVideoMessage(
                  this.props.celebrity.contractTypes
                )}
                celebrityId={this.props.celebrity.id}
                celebrityFullName={this.props.celebrity.fullName}
                celebrityUsername={this.props.celebrity.username}
                celebrityAvatar={this.props.celebrity.avatar}
              />
            </div>
            {/* STEPS COMMUNICATION */}
            <div
              className={"col-sm-12 col-md-6 col-lg-6 mx-auto p-4 text-center"}
            >
              <div className={"steps-image ml-2 mb-2 mx-auto my-auto"}>
                <div className={"text-left"}>
                  <i
                    className={"ml-2 fas fa-question-circle"}
                    style={{ fontSize: "20px" }}
                  />
                </div>
                <img
                  width="100%"
                  className={"create-contract-steps"}
                  src={hiring_proccess_img[router.locale]}
                  alt={"create-contract-steps"}
                />
              </div>
            </div>
          </div>
        </PageContainer>
      </>
    );
  }
}

// Set defaultProps
CreateContractPage.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.celebrities.getCelebrityReducer.loading,
  celebrity: state.celebrities.getCelebrityReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  getCelebrity: celebrityOperations.get
};

// Export Class
const _CreateContractPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateContractPage));

export { _CreateContractPage as CreateContractPage };
