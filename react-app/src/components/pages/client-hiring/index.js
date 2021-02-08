import React, { Component } from "react";
import { connect } from "react-redux";

import { contractOperations } from "../../../state/ducks/contracts";

class ClientHiringPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {}
    };
  }

  componentWillMount() {
    this.props.getContract(this.props.match.params.contract_reference);
  }

  componentDidMount() {
    document.getElementsByClassName("f-main-body")[0].style.background =
      "#f7f7f7";
  }

  componentWillUnmount() {
    document.getElementsByClassName("f-main-body")[0].style.background = "#fff";
  }

  render() {
    return (
      <>
        <div className="ClientHiringPage">
          contract:
          <pre>{JSON.stringify(this.props.contract)}</pre>
        </div>
      </>
    );
  }
}

// Set propTypes
ClientHiringPage.propTypes = {};

// Set defaultProps
ClientHiringPage.defaultProps = {
  contract: {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.contracts.getContractReducer.loading,
  contract: state.contracts.getContractReducer.data.contract,
  isCompleted: state.contracts.getContractReducer.completed
});

// mapStateToProps
const mapDispatchToProps = {
  getContract: contractOperations.getContract
};

// Export Class
const _ClientHiringPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientHiringPage);
export { _ClientHiringPage as ClientHiringPage };
