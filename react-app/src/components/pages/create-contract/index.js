import React, { Component } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import * as GTM from "../../../state/utils/gtm";
import { CreateContractForm } from "../../containers";
import MetaTags from "react-meta-tags";
import { Session } from "../../../state/utils/session";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

const getContractPriceVideoMessage = (contractsTypes) =>
  contractsTypes?.find?.((contract) => contract.contractType === 1)?.price || 0;

class CreateContractPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    GTM.tagManagerDataLayer("CREATE_CONTRACT_PAGE_VIEW", this.props.match);
    const session = new Session();
    if (session.isDummy()) {
      localStorage.setItem(
        "finalRedirect",
        "/" + this.props.match.params["celebrity_username"] + "/contratar"
      );
      history._pushRoute(PATHS.AUTH_FLOW);
    }
  }

  componentWillMount() {
    if (this.props.match.params["celebrity_username"]) {
      this.props.getCelebrity(this.props.match.params["celebrity_username"]);
    }
  }

  render() {
    return (
      <>
        {this.props.celebrity.id ? (
          <MetaTags>
            <title>
              Famosos.com - Comprar video personalizado de{" "}
              {this.props.celebrity.fullName}
            </title>
            <meta
              name='description'
              content={
                "Comprar video personalizado de " +
                this.props.celebrity.fullName +
                " en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas."
              }
            />
          </MetaTags>
        ) : (
          <div></div>
        )}

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
                  width='100%'
                  className={"create-contract-steps"}
                  src={"/assets/img/create-contract-steps.svg"}
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
)(CreateContractPage);
export { _CreateContractPage as CreateContractPage };
