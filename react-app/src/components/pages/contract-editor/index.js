import React, { Component } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import {
  saveContractToPay,
  saveContractToPayClear,
  getContract
} from "../../../state/ducks/contracts/actions";
import * as GTM from "../../../state/utils/gtm";
import { CreateContractForm } from "../../containers";
import MetaTags from "react-meta-tags";
import { Session } from "../../../state/utils/session";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

class EditContractPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const shouldFetchContract =
      this.props.match.params.contract_reference && !this.props.celebrityId;
    if (shouldFetchContract) {
      this.props.getContract(this.props.match.params.contract_reference);
    }
    // GTM.tagManagerDataLayer("CREATE_CONTRACT_PAGE_VIEW", this.props.match);
    // const session = new Session();
    // if (session.isDummy()) {
    //   localStorage.setItem(
    //     "finalRedirect",
    //     "/" + this.props.match.params["celebrity_username"] + "/contratar"
    //   );
    //   history._pushRoute(PATHS.AUTH_FLOW);
    // }
  }

  componentWillUnmount() {
    this.props.saveContractToPayClear();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { contract } = this.props;
    if (prevProps.contract !== contract) {
      this.props.saveContractToPay({
        ...contract,
        celebrity: contract.celebrityData
      });
    }
  }

  render() {
    return (
      <>
        {this.props.celebrityId ? (
          <MetaTags>
            <title>
              Famosos.com - Editar video personalizado de{" "}
              {this.props.celebrity.fullName}
            </title>
            <meta
              name="description"
              content={
                "Comprar video personalizado de " +
                this.props.celebrity.fullName +
                " en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas."
              }
            />
          </MetaTags>
        ) : null}

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
                celebrityId={this.props.celebrityId}
                celebrityFullName={this.props.celebrity.fullName}
                celebrityUsername={this.props.celebrity.username}
                celebrityAvatar={this.props.celebrity.avatar}
              />
            </div>
            {/* STEPS COMMUNICATION */}
            <div
              className={
                "col-sm-12 col-md-6 col-lg-6 mx-auto my-auto p-4 text-center"
              }
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
EditContractPage.defaultProps = {};

// mapStateToProps
const mapStateToProps = (state) => {
  return {
    isLoading: state.celebrities.getCelebrityReducer.loading,
    celebrity: state.contracts.saveContractToPayReducer.data.celebrity || {},
    celebrityId: state.contracts.saveContractToPayReducer.data.celebrityId,
    contract: state.contracts.getContractReducer.data
  };
};

// mapStateToProps
const mapDispatchToProps = {
  getContract,
  getCelebrity: celebrityOperations.get,
  saveContractToPay,
  saveContractToPayClear
};

// Export Class
const _EditContractPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContractPage);
export { _EditContractPage as EditContractPage };
